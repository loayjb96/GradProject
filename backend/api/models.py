from django.db import models
from django.core.files import File



class Result(models.Model):
    pass

class Test_my(models.Model):
    test_id=models.CharField(max_length=32)
    pass
    # test_file=File
    # test_date=models.DateField()
    # result= result


# Create your models here.
