from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Subs(models.Model):
	subname = models.CharField(max_length=30)
	subslist = JSONField()

	def __str__(self):
		return self.subname


class userSession(models.Model):
	userID = models.CharField(max_length=200)


class Inventory(models.Model):
	session = models.ForeignKey(userSession, on_delete=models.CASCADE)
	item = models.ForeignKey(Subs, on_delete=models.DO_NOTHING)