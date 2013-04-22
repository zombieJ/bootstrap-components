<?php
	if(isset($_FILES["s_file"]) && $_FILES["s_file"]["error"] == 0) {
		echo "Single File Upload: ";
		echo $_FILES["s_file"]["name"];
	}

	if(isset($_FILES["m_file"])) {
		echo "Multi File Upload: ";
		echo count($_FILES['m_file']['size'])." files";
	}
?>