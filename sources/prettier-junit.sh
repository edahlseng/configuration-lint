#!/bin/bash

echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
echo "<testsuites>"

exitCode=0

for file in $(prettier --list-different "$@"); do
    exitCode=1
    echo "<testsuite package=\"prettier\" time=\"0\" tests=\"1\" errors=\"1\" name=\"$file\">"
    echo "<testcase time=\"0\" name=\"prettier\"><failure type=\"IncorrectFormatting\">$file contains incorrect formatting</failure></testcase>"
    echo "</testsuite>"
done

echo "</testsuites>"

exit $exitCode
