from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Subs(models.Model):
    subname = models.CharField(max_length=30)
    subslist = JSONField()

    def __str__(self):
        return self.subname