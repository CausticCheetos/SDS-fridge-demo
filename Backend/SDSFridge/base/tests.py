from django.test import TestCase

# Create your tests here.
from django.urls import reverse
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

class NotificationTests(TestCase):
    def setUp(self):
        self.Notification = Notification()

    def test_post_list_view(self):
        # Create a post
        Notification.objects.create(title='Test noti', content='Test content')

        # Access the notification_list view
        response = self.client.get(reverse('noti_list'))

        # Check that the response has a status code of 200
        self.assertEqual(response.status_code, 200)

        # Check that the notification title appears in the rendered HTML
        self.assertContains(response, 'Test post')

        # Check that the notification content appears in the rendered HTML
        self.assertContains(response, 'Test content')