
In addition, you will also need to implement the PHP code for the `check.php`, `save.php`, and `update.php` scripts that the JavaScript code references. These scripts will handle the communication between the web form and the database. Here is an example implementation of these scripts using PHP and MySQLi:

**check.php:**

```php
<?php
$roll_no = $_GET['roll-no'];

// Create a database connection
$mysqli = new mysqli('localhost', 'root', 'password', 'school-db');

// Check if the Roll No exists in the STUDENT-TABLE relation
$query = "SELECT * FROM `STUDENT-TABLE` WHERE `Roll-No`='$roll_no'";
$result = $mysqli->query($query);

if ($result->num_rows > 0) {
    echo 'true'; // Roll No already exists
} else {
    echo 'false'; // Roll No does not exist
}

$mysqli->close();
?>

<?php
$roll_no = $_POST['roll-no'];
$full_name = $_POST['full-name'];
$class = $_POST['class'];
$birth_date = $_POST['birth-date'];
$address = $_POST['address'];
$enrollment_date = $_POST['enrollment-date'];

// Create a database connection
$mysqli = new mysqli('localhost', 'root', 'password', 'school-db');

// Insert the new student data into the STUDENT-TABLE relation
$query = "INSERT INTO `STUDENT-TABLE` (`Roll-No`, `Full-Name`, `Class`, `Birth-Date`, `Address`, `Enrollment-Date`) VALUES ('$roll_no', '$full_name', '$class', '$birth_date', '$address', '$enrollment_date')";
$result = $mysqli->query($query);

$mysqli->close();
?>


<?php
$roll_no = $_POST['roll-no'];
$full_name = $_POST['full-name'];
$class = $_POST['class'];
$birth_date = $_POST['birth-date'];
$address = $_POST['address'];
$enrollment_date = $_POST['enrollment-date'];

// Create a database connection
$mysqli = new mysqli('localhost', 'root', 'password', 'school-db');

// Update the existing student data in the STUDENT-TABLE relation
$query = "UPDATE `STUDENT-TABLE` SET `Full-Name`='$full_name', `Class`='$class', `Birth-Date`='$birth_date', `Address`='$address', `Enrollment-Date`='$enrollment_date' WHERE `Roll-No`='$roll_no'";
$result = $mysqli->query($query);

$mysqli->close();
?>
