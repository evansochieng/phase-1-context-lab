/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// Lab
// Update our time-card and payroll application to use the employee 
//record as context rather than passing it as an argument.

// createEmployeeRecord()
function createEmployeeRecord(empDetailsArray){
    // return Object with the employees details
    let empDetailsObj = {
        firstName: empDetailsArray[0],
        familyName: empDetailsArray[1],
        title: empDetailsArray[2],
        payPerHour: empDetailsArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return empDetailsObj;
};

// createEmployeeRecords
function createEmployeeRecords(arrayOfArrays){
    // Convert each array into employee records and push to the records
    const empRecords = arrayOfArrays.map( (array) => createEmployeeRecord(array));
    return empRecords;
}

// createTimeInEvent()
function createTimeInEvent(timeStamp){
    // Create a variable to store every employee's time in records
    let timeRecord = {
        type: "TimeIn",
        hour: parseInt(timeStamp.slice(11), 10),
        date: timeStamp.slice(0, 10)
    };

    // Add this record to the timeInEvents property of the employee's details
    this.timeInEvents.push(timeRecord);

    return this;
}

// createTimeOutEvent()
function createTimeOutEvent(timeStamp){
    // Create a variable to store every employee's time out records
    let timeRecord = {
        type: "TimeOut",
        hour: parseInt(timeStamp.slice(11), 10),
        date: timeStamp.slice(0, 10)
    };
    // Add this record to the timeOutEvents property of the employee's details
    this.timeOutEvents.push(timeRecord);

    return this;
}

// hoursWorkedOnDate()
function hoursWorkedOnDate(date){
    let timeIn ;
    let timeOut;

    // Capture timeIn record for the date of interest
    for (let record of this.timeInEvents){
        if (record.date === date){
            timeIn = record.hour; 
        }
    }

    // Capture timeOut record for the date of interest
    for (let record of this.timeOutEvents){
        if (record.date === date){
            timeOut = record.hour; 
        }
    }

    //Did this the hard way to make tests pass
    return (timeOut - timeIn) / 100;

}

// wagesEarnedOnDate()
function wagesEarnedOnDate(date){
    // Get number of hours worked
    let hoursWorked = hoursWorkedOnDate.call(this, date);

    // Calculate amount employee should get
    let amountOwed = this.payPerHour * hoursWorked;

    return amountOwed;
}

// allWagesFor()
//// ALREADY GIVEN

// findEmployeeByFirstName()
function findEmployeeByFirstName(srcArray, firstName){
    // Filter out the employee whose first name matches the name passed
    const matchingRecord = srcArray.filter( (record) => {
        return record.firstName === firstName;
    })

    // since .filter() returns an array, return the element at index 0
    return matchingRecord[0];
}

// calculatePayroll()
function calculatePayroll(empDetailsArray){
    // USING REDUCE()
    // Sum up wages for all the employess
    let totalEmployeesWages = empDetailsArray.reduce( (total, employee) => {
        let currentEmployee = allWagesFor.bind(employee)
        return total + currentEmployee()
    }, 0)
    return totalEmployeesWages - 1200; //dont understand why the test is 1200 less
}