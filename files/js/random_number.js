function schoolClass(students, studentnames) {
    this.students = (Array.isArray(students)) ? students : [];
    this.newStudents = this.students;
    this.studentnames = (Array.isArray(studentnames)) ? studentnames : [];
    this.names = this.studentnames;
}
schoolClass.prototype = {
    update(studentnumber) {
        this.students = this.newStudents;
        if (typeof studentnumber === 'number' && !isNaN(studentnumber)) {
            this.students = new Array(studentnumber);
            for (var i = 0; i < this.students.length; i++) {
                this.students[i] = i;
            }
            this.newStudents = this.students;
        }
        return this.students;
    },
    randomNumber() {
        var numbers = this.students;
        var newNumber = new Array(this.newStudents.length);
        for (var i = 0; i < newNumber.length; i++) {
            var numb = Math.floor(Math.random() * numbers.length);
            newNumber[i] = numbers[numb];
            numbers.splice(numb, 1);
            //console.log(numbers);
            //console.log(i);
            //console.log(this.newStudents.length);
        }
        this.newStudents = newNumber;
        return this.update();
    },
    updateStudentNames(studentnames) {
        studentnames = (Array.isArray(studentnames)) ? studentnames : [];
        this.studentnames = studentnames;
        return studentnames;
    },
    matchNumbersAndNames(studentnames) {
        if (Array.isArray(studentnames)) this.updateStudentNames(studentnames);
        var names = new Array(this.newStudents.length);
        for (var i = 0; i < names.length; i++) {
            names[i] = this.studentnames[this.newStudents[i]];
        }
        this.names = names;
        return this.names;
    },
    setJSON(jsonstr){
        var parsed = JSON.parse(jsonstr);
        this.newStudents = Array.isArray(parsed)?parsed.map((val,idx,arr)=>{return val.numb-1;}):this.newStudents;
        this.studentnames = Array.isArray(parsed)?new Array(parsed.length).map((val,idx,arr)=>{return parsed.map((val1,idx1,arr1)=>{if (val1.numb===idx){return val1;}})[0].name;}):this.studentnames;
        this.names = this.studentnames;
        
        return this.update();
    },
    generateJSON(){
        var rtv = new Array(this.students.length);
        for (var i = 0;i<rtv.length;i++){
            rtv[i]={numb:this.newStudents[i]+1,name:this.matchNumbersAndNames()[i]};
        }
        return JSON.stringify(rtv);
    },
}

function schoolClassHTML(myEl, yourClass, { className }) {
    this.myEl = (myEl instanceof HTMLElement) ? myEl : document.body;
    this.className = (typeof className === 'string') ? className : 'desks';
    this.yourClass = (yourClass instanceof schoolClass) ? yourClass : new schoolClass([], []);
}
schoolClassHTML.prototype = {
    setHTML() {
        var yourClass = this.yourClass;
        var newarr = yourClass.matchNumbersAndNames();
        this.myEl.querySelectorAll('.' + this.className).forEach(function (el, idx, parEl) {
            el.innerHTML = `<div style="text-align:center;"><p><span style="font-size:0.75em;">${yourClass.newStudents[idx] + 1}번</span></p><p><span style="font-weight:800;">${newarr[idx]}</span></p></div>`;
        })
    },
}
