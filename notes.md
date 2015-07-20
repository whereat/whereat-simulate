Routes
======

# Hop to squares
telnet localhost 5554

geo fix -74.011262 40.7092649
geo fix -74.0060949 40.7129028
geo fix -74.0029282 40.7144512

geo fix -73.9817472 40.7264615
geo fix -73.985131 40.758895


# Converge on NYSE (by role)

## Phone (from liberty)
telnet localhost 5554

geo fix -74.011262 40.7092649

geo fix -74.010705 40.708867
geo fix -74.011338 40.708273
geo fix -74.011285 40.707508
geo fix -74.010823 40.706923

## Postman 1 (from Bowling Green)

{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fa","lat": 40.704715, "lon": -74.013685,"time": 2505606400000 }
{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fa","lat": 40.705007, "lon": -74.012537,"time": 2505606401000 }
{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fa","lat": 40.705731, "lon": -74.011443,"time": 2505606402000 }
{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fa","lat": 40.706886, "lon": -74.010853,"time": 2505606403000 }


## Postman 2 (from Vietname Memorial)

{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fb","lat":40.703084,"lon":-74.010126,"time": 2505606400000 }
{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fb","lat":40.704092,"lon":-74.008989,"time": 2505606401000 }
{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fb","lat":40.705264,"lon":-74.010029,"time": 2505606402000 }
{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fb","lat":40.706638,"lon":-74.011006,"time": 2505606403000 }

==========================
Converge on NYSE (by step)
==========================

## Clear local mem
adb shell
cd /data/data/org.tlc.whereat/databases
sqlite3 whereat.db
delete from locations;

## Step 0
telnet localhost 5554
geo fix -74.011262 40.7092649

## Step 1 (INIT)

{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fa","lat": 40.704715, "lon": -74.013685,"time": 2505606400000 }

{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fb","lat":40.703084,"lon":-74.010126,"time": 2505606400000 }

geo fix -74.010705 40.708867

## Step 2 (REFRESH)

{"lastPing":0,"location":{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fa","lat": 40.705007, "lon": -74.012537,"time": 2505606401000 }}

{"lastPing":0,"location":{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fb","lat":40.704092,"lon":-74.008989,"time": 2505606401000 }}

geo fix -74.011338 40.708273

## Step 3 (REFRESH)

{"lastPing":0,"location":{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fa","lat": 40.705731, "lon": -74.011443,"time": 2505606402000 }}

{"lastPing":0,"location":{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fb","lat":40.705264,"lon":-74.010029,"time": 2505606402000 }}

geo fix -74.011285 40.707508

## Step 4 (REFRESH)

{"lastPing":0,"location":{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fa","lat": 40.706886, "lon": -74.010853,"time": 2505606403000 }}

{"lastPing":0,"location":{"id":"75782cd4-1a42-4af1-9130-05c63b2aa9fb","lat":40.706638,"lon":-74.011006,"time": 2505606403000 }}

geo fix -74.010823 40.706923

## Step 5 (CLEANUP)
POST locations/erase
