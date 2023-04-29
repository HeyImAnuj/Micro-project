$(document).ready(function() {
	// set focus on Roll No input field and disable all other fields and buttons except Save
	$('#roll-no').focus();
	$('#full-name, #class, #birth-date, #address, #enrollment-date, #update-btn, #reset-btn').prop('disabled', true);

	// Roll No input field value changed
	$('#roll-no').on('input', function() {
		var rollNo = $(this).val();
		if (rollNo == '') {
			$('#full-name, #class, #birth-date, #address, #enrollment-date').prop('disabled', true);
			$('#save-btn').prop('disabled', true);
			$('#update-btn').prop('disabled', true).html('Update');
			return;
		}
		$.ajax({
			type: 'GET',
			url: 'check.php',
			data: { 'roll-no': rollNo },
			success: function(response) {
				if (response == 'true') { // Roll No already exists
					$('#full-name, #class, #birth-date, #address, #enrollment-date').prop('disabled', false);
					$('#save-btn').prop('disabled', true);
					$('#update-btn').prop('disabled', false).html('Update');
					$('#full-name').focus();
				} else { // Roll No does not exist
					$('#full-name, #class, #birth-date, #address, #enrollment-date').prop('disabled', false);
					$('#save-btn').prop('disabled', false);
					$('#update-btn').prop('disabled', true).html('Update');
					$('#class').focus();
				}
			},
			error: function() {
				alert('Error occurred while checking Roll No.');
			}
		});
	});

	// Save button clicked
	$('#student-form').on('submit', function(event) {
		event.preventDefault();
		var data = $(this).serialize();
		$.ajax({
			type: 'POST',
			url: 'save.php',
			data: data,
			success: function(response) {
				alert('Data saved successfully.');
				$('#student-form').trigger('reset');
				$('#roll-no').focus();
				$('#full-name, #class, #birth-date, #address, #enrollment-date, #update-btn, #reset-btn').prop('disabled', true);
				$('#save-btn').prop('disabled', false);
			},
			error: function() {
				alert('Error occurred while saving data.');
			}
		});
	});

	// Update button clicked
	$('#update-btn').on('click', function() {
		var rollNo = $('#roll-no').val();
		var data = $('#student-form').serialize();
		$.ajax({
			type: 'POST',
			url: 'update.php',
			data: data,
			success: function(response) {
				alert('Data updated successfully.');
				$('#student-form').trigger('reset');
				$('#roll-no').val(rollNo).prop('disabled', false);
				$('#full-name, #class, #birth-date, #address, #enrollment-date, #save-btn, #reset-btn').prop('disabled', true);
				$('#update-btn').prop('disabled', false).html('Update');
				$('#class').focus();
			},
			error: function() {
				alert('Error occurred while updating data.');
			}
		});
	});

	// Reset button clicked
	$('#reset-btn').on('click', function() {
	
        $('#student-form').trigger('reset');
        $('#roll-no').prop('disabled', false);
        $('#full-name, #class, #birth-date, #address, #enrollment-date, #save-btn, #update-btn').prop('disabled', true);
        $('#save-btn').prop('disabled', false);
        $('#roll-no').focus();
    });
})