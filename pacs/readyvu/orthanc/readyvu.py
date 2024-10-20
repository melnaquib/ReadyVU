import json
import os
from pprint import pprint
import orthanc
from pydicom import dcmread, dcmwrite
import pydicom
import io
import tempfile
import requests


class Study(object):

    def __init__(self):
        self.study_iuid = ""
        self.study_id = ""
        self.doctor_referring = ""
        self.doctor_performing = ""
        self.patient = ""

class Report(object):

    def __init__(self):
        self.template_id = ""
        self.hospital_name = ""
        self.patient_name_bookmark_id = ""
        self.images_bookmark_id = ""
        self.finding_bookmark_id = ""

def generic_template():
    # 
#     [ 'id.qt38aa6hiyl',
#   'id.v6sia8vj9vu3',
#   'id.lh5ssgdcdm07',
#   'id.2foduxjbal66',
#   'id.8s30gg2xi168' ]
    
    report = {
        "template_id": "1YUqgBpMeScQfKfjSIzQcMeGz2YSj1JjUTyGqD8Lxjfs",
        "bookmarks": {
            'id.qt38aa6hiyl': "doctor_referring",
            'id.v6sia8vj9vu3': "patient",
            'id.lh5ssgdcdm07': "findings_imgs",
            'id.2foduxjbal66': "summary",
            'id.8s30gg2xi168': "doctor_performing",
        },
    }

    return report

def study_from_dataset(dataset):
    study = {
        "study_iuid" : dataset.StudyInstanceUID,
        "study_id" : dataset.StudyID,
        "doctor_referring" : str(dataset.ReferringPhysicianName),
        "doctor_performing" : str(dataset.PerformingPhysicianName),
        "patient" : str(dataset.PatientName),
    }
    return study;

def get_template(dicom, dataset):
    return generic_template()

def share_report_gdoc(template, study):
    GDOC_ENDPOINT_ID = "AKfycbxyVolA-l3U280LYEqZqGyN8xBoSnX1YVQj0Ae74_GxJzhtQ7pE5pKn6L71OQ3lc108"
    GDOC_ENDPOINT = "https://script.google.com/macros/s/AKfycbxyVolA-l3U280LYEqZqGyN8xBoSnX1YVQj0Ae74_GxJzhtQ7pE5pKn6L71OQ3lc108/exec"
                    # "https://script.google.com/macros/s/AKfycbxyVolA-l3U280LYEqZqGyN8xBoSnX1YVQj0Ae74_GxJzhtQ7pE5pKn6L71OQ3lc108/exec";
    body = {
        "action": "share_report",
        "study": study,
        "template": template,
    }
    pprint(body)
    r = requests.post(GDOC_ENDPOINT, json=body)


def share_report(template, dicom, dataset):
    study  = study_from_dataset(dataset)
    study["template_id"] = template["template_id"];
    share_report_gdoc(template, study)

def on_stored_instance(dicom, instance_id):
    print("SOP", instance_id)
    dataset = dcmread(io.BytesIO(dicom.GetInstanceData()))
    template = get_template(dicom, dataset)
    share_report(template, dicom, dataset)
