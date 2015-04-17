
FROM=2014-04
FROMINT=201404
TO=2015-04
TOINT=201504

BASIC="http://gs.statcounter.com/chart.php?device=Desktop%2C%20Tablet%20%26%20Console&device_hidden=desktop%2Btablet%2Bconsole&statType_hidden=browser_version_partially_combined&region_hidden=ww&granularity=monthly&statType=Combine%20Chrome%20(all%20versions)%20%26%20Firefox%20(5%2B)&region=Worldwide&fromInt=$FROMINT&toInt=$TOINT&fromMonthYear=$FROM&toMonthYear=$TO&multi-device=true&csv=1"

echo $BASIC

curl $BASIC > data/basic_data.csv
