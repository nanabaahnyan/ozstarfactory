from django.test import TestCase, override_settings


class StatusApiTests(TestCase):
    def test_status_reports_maintenance(self):
        response = self.client.get("/api/status/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data["maintenance"])
        self.assertEqual(data["title"], "System is under maintenance")

    @override_settings(MAINTENANCE_MESSAGE="Back at 6pm")
    def test_status_uses_configured_message(self):
        self.assertEqual(self.client.get("/api/status/").json()["message"], "Back at 6pm")

    def test_health(self):
        self.assertEqual(self.client.get("/api/health/").json(), {"status": "ok"})

    def test_status_rejects_post(self):
        self.assertEqual(self.client.post("/api/status/").status_code, 405)
