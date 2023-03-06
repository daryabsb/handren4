create a restframework Viewset from the models below called TimelineViewset, 
basically the view should give you a timeline of events(appointments) 
newest on top custom paginated by the user(page=n&page_size=n),
if a client's id passed, the timeline will be filtered for the specific client,
if specific range of dates passed should be filtered for that range,
create custom serializers if needed and suggest better models if you needed to
lastly create another base model of modify the current one if you think I have repeated codes: 

class BaseModel(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Client(BaseModel):
    name = models.CharField(max_length=60, db_index=True)

class Attachment(BaseModel):
    client = models.ForeignKey(
        "Client", on_delete=models.CASCADE, related_name="attachments", db_index=True
    )
    file = models.FileField(upload_to="upload_files")


class Appointment(BaseModel):
    # user = models.ForeignKey("User", on_delete=models.CASCADE)
    client = models.ForeignKey(
        "Client", on_delete=models.CASCADE, related_name="appointments", db_index=True
    )
    title = models.CharField(max_length=200, null=True, blank=True)
    date = models.DateTimeField()
    date_to = models.DateTimeField(null=True, blank=True)

class Treatment(BaseModel):
    client = models.ForeignKey(
        "Client", on_delete=models.CASCADE, related_name="treatments", db_index=True
    )
    appointment = models.ForeignKey(
        "Appointment", on_delete=models.SET_NULL, null=True, blank=True,
        related_name="treatments"
    )
    note = models.TextField(null=True, blank=True)

class Prescription(BaseModel):
    client = models.ForeignKey(
        "Client", on_delete=models.CASCADE, related_name="prescriptions", db_index=True
    )
    appointment = models.ForeignKey(
        "Appointment", on_delete=models.SET_NULL, null=True, blank=True,
        related_name="prescriptions"
    )
    medication = models.ForeignKey(
        "Medication", on_delete=models.CASCADE, related_name="prescriptions"
    )

class Medication(models.Model):
    medicine_name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=20)
    duration = models.IntegerField()

class ClinicalExamination(BaseModel):
    client = models.OneToOneField(
        'Client', on_delete=models.CASCADE, unique=True,
        related_name='examinations', db_index=True
    )
