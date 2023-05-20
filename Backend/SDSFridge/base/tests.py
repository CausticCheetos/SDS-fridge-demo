from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.contrib.auth.models import User
from .models import Notification
from .views import create_notification, get_notifications, mark_notification_as_read, delete_notification

class NotificationTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.notification = Notification.objects.create(user=self.user, message='Test Notification')

    def test_create_notification(self):
        new_notification = create_notification(user=self.user, message='New Notification')
        self.assertEqual(new_notification.user, self.user)
        self.assertEqual(new_notification.message, 'New Notification')

    def test_get_notifications(self):
        notifications = get_notifications(user=self.user)
        self.assertIn(self.notification, notifications)

    def test_mark_notification_as_read(self):
        mark_notification_as_read(notification=self.notification)
        self.assertTrue(self.notification.read)

    def test_delete_notification(self):
        delete_notification(notification=self.notification)
        notifications = get_notifications(user=self.user)
        self.assertNotIn(self.notification, notifications)