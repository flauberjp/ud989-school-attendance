/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    // ============ UTIL  ===============
    var util = {
        getRandom: function () {
            return (Math.random() >= 0.5);
        }
    }

    // ============ MODEL ===============
    var model = {
        students: [
            { 
                name: 'Slappy the Frog',
                attendance: []
            },
            { 
                name: 'Lilly the Lizard',
                attendance: []
            },
            { 
                name: 'Paulrus the Walrus',
                attendance: []
            },
            { 
                name: 'Gregory the Goat',
                attendance: []
            },
            { 
                name: 'Adam the Anaconda',
                attendance: []
            },
        ],
        init: function() {
            if (!localStorage.students) {
                console.log('Creating records...');
                this.students.forEach(function(student) {
                    for (var i = 0; i <= 11; i++) {
                        student.attendance.push(util.getRandom());
                    }
                });
                localStorage.students = JSON.stringify(this.students);
            }
            console.log('Loading records...');
            this.students = JSON.parse(localStorage.students)
        }
    }

    // ========= OCTOPUS ============
    octopus = {
        // When a checkbox is clicked, update localStorage
        updateAttendance: function(studentIndex, attendanceIndex) {
            model.students[studentIndex].attendance[attendanceIndex] = 
                !model.students[studentIndex].attendance[attendanceIndex];
            view.render(model.students);
        },
        init: function() {
            model.init();
            view.init(model.students);
        }
    }

    // ========= VIEW ============
    view = {
        render: function(students) {
            this.tbody = document.getElementsByTagName('tbody')[0];
            while (this.tbody.firstChild) {
                this.tbody.removeChild(this.tbody.firstChild);
            }
            for(var i = 0; i < students.length; i++) {
                var studentRow = document.createElement('tr');
                studentRow.setAttribute('class', 'student');
                this.tbody.appendChild(studentRow);

                var studentNameCol = document.createElement('td');
                studentNameCol.setAttribute('class', 'name-col');
                studentNameCol.innerText = students[i].name;
                studentRow.appendChild(studentNameCol);

                var numMissed = 0;
                for(var j = 0; j < students[i].attendance.length; j++) {
                    var studentAttendenceCol = document.createElement('td');
                    studentAttendenceCol.setAttribute('class', 'attend-col');

                    // checkbox indicating if the class was checked by the student
                    var studentAttendenceColValue = document.createElement('input');
                    studentAttendenceColValue.setAttribute('type', 'checkbox');
                    studentAttendenceColValue.checked = students[i].attendance[j];
                    if (studentAttendenceColValue.checked) {
                        ++numMissed;
                    }
                    studentAttendenceColValue.addEventListener(
                            'click', 
                            (
                                function(studentIndex, attendanceIndex) {
                                    return function() {
                                        octopus.updateAttendance(studentIndex, attendanceIndex);
                                    }
                                }
                            )(i, j)
                        );

                    studentAttendenceCol.appendChild(studentAttendenceColValue);

                    studentRow.appendChild(studentAttendenceCol);
                }

                var missedCol = document.createElement('td');
                missedCol.setAttribute('class', 'missed-col');
                missedCol.innerText = parseInt(numMissed);
                studentRow.appendChild(missedCol);
            }
        },
        init: function(students) {
            this.render(students);
        }
    }

    octopus.init();
}());

