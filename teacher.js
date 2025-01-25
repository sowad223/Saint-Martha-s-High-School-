// Teacher Profile Script
console.log("Teacher Profile Loaded");

// Save Attendance
document.getElementById('saveAttendance').addEventListener('click', () => {
  const attendanceTable = document.getElementById('attendanceTable');
  const rows = attendanceTable.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const studentName = row.cells[0].textContent;
    const attendance = row.cells[2].querySelector('input').checked ? 'Present' : 'Absent';
    console.log(`${studentName}: ${attendance}`);
  });
  alert('Attendance saved!');
});