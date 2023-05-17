from django.db import models

# Create your models here.
class Flow(models.Model):
    FlowId = models.AutoField(primary_key=True)
    date = models.DecimalField(max_digits=50, decimal_places=0)
    value = models.DecimalField(max_digits=50, decimal_places=45)

    def _str_(self):
            return self.value