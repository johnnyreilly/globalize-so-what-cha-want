write-host "Present working directory: $($pwd)"

$testsuites = [xml](get-content .\test-results\*.xml)
$anyFailures = $FALSE

foreach ($testsuite in $testsuites.testsuite) {

    write-host " $($testsuite.name)"

    foreach ($testcase in $testsuite.testcase){
        $failed = $testcase.failure
        $time = [decimal]$testsuite.time * 1000 # from seconds to milliseconds
        $testName = "$($testcase.classname) $($testcase.name)"

        if ($failed) {
            write-host "Failed   $($testcase.name) $($testcase.failure.message)"
            Add-AppveyorTest $testName -Outcome Failed -FileName $testsuite.name -ErrorMessage $testcase.failure.message -Duration $time
            $anyFailures = $TRUE
        }
        else {
            write-host "Passed   $($testcase.name)"
            Add-AppveyorTest $testName -Outcome Passed -FileName $testsuite.name -Duration $time
        }
    }
}

if ($anyFailures -eq $TRUE){
    write-host "Failing build as there are broken tests"
    $host.SetShouldExit(1)
}
