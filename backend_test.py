import requests
import sys
import json
from datetime import datetime

class StudySmartAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"Response preview: {str(response_data)[:200]}...")
                    return True, response_data
                except:
                    print(f"Response text: {response.text[:200]}...")
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}...")
                return False, {}

        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection Error: Could not connect to {url}")
            return False, {}
        except requests.exceptions.Timeout:
            print(f"❌ Failed - Timeout: Request timed out")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root endpoint"""
        return self.run_test("Root Endpoint", "GET", "", 200)

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test("Health Check", "GET", "api/health", 200)

    def test_get_subjects(self):
        """Test get subjects endpoint"""
        success, response = self.run_test("Get Subjects", "GET", "api/subjects", 200)
        if success and isinstance(response, dict) and 'subjects' in response:
            subjects = response['subjects']
            print(f"Available subjects: {subjects}")
            return True, subjects
        return False, []

    def test_get_questions(self, subject):
        """Test get questions for a specific subject"""
        success, response = self.run_test(
            f"Get Questions for {subject}", 
            "GET", 
            f"api/questions/{subject}", 
            200
        )
        if success and isinstance(response, dict):
            questions = response.get('questions', [])
            print(f"Found {len(questions)} questions for {subject}")
            return True, questions
        return False, []

    def test_static_files(self):
        """Test static file serving"""
        success, response = self.run_test(
            "Static File Access", 
            "GET", 
            "data/final_quant.json", 
            200
        )
        return success, response

def main():
    print("🚀 Starting StudySmart API Tests")
    print("=" * 50)
    
    # Setup
    tester = StudySmartAPITester("http://localhost:8001")
    
    # Test basic endpoints
    print("\n📋 Testing Basic Endpoints...")
    tester.test_root_endpoint()
    tester.test_health_check()
    
    # Test subjects endpoint
    print("\n📚 Testing Subjects...")
    success, subjects = tester.test_get_subjects()
    
    # Test questions for each subject
    if success and subjects:
        print("\n❓ Testing Questions for Each Subject...")
        for subject in subjects:
            tester.test_get_questions(subject)
    else:
        print("⚠️ No subjects found, testing with known subjects...")
        known_subjects = ['quant', 'varc', 'dilr', 'essay', 'decision-making']
        for subject in known_subjects:
            tester.test_get_questions(subject)
    
    # Test static file serving
    print("\n📁 Testing Static File Serving...")
    tester.test_static_files()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️ Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())