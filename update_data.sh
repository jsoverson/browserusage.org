
FROM=2013-02
FROMINT=201302
TO=2015-02
TOINT=201502

BASIC="http://gs.statcounter.com/chart.php?201408=undefined&device=Desktop%20%26%20Tablet&device_hidden=desktop%2Btablet&statType_hidden=browser_version_partially_combined&region_hidden=ww&granularity=monthly&statType=Combine%20Chrome%20(all%20versions)%20%26%20Firefox%20(5%2B)&region=Worldwide&fromInt=$FROMINT&toInt=$TOINT&fromMonthYear=$FROM&toMonthYear=$TO&multi-device=true&csv=1"

curl $BASIC > data/basic_data.csv
