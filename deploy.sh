#!/bin/bash
aws s3 cp index.html s3://flw-webxr-workshop/ --profile=flowing
aws s3 cp src s3://flw-webxr-workshop/src --recursive --profile=flowing