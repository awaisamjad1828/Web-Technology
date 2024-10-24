from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=100)
    link = models.URLField()
    description = models.TextField()
    image = models.URLField()
    category = models.CharField(max_length=50)
    language = models.CharField(max_length=10)

    def __str__(self):
        return self.title
