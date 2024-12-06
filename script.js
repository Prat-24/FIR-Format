document.addEventListener("DOMContentLoaded", function () {
    
   // Get references to the dropdown and "OTHER" input field
   const unitSelect = document.getElementById('unitSelect');
   const otherInput = document.getElementById('otherInput');

   // Handle dropdown selection changes
   unitSelect.addEventListener('change', function () {
       const selectedValue = this.value;

       if (selectedValue === 'Other') {
           otherInput.style.display = 'inline';
           otherInput.required = true;
       } else {
           otherInput.style.display = 'none';
           otherInput.value = '';
           otherInput.required = false;
           console.log('Selected Unit:', selectedValue);
           alert('Selected Unit: ' + selectedValue);
       }
   });

   // Handle "OTHER" input field blur event
   otherInput.addEventListener('blur', function () {
       if (this.value.trim()) {
           console.log('Selected Unit:', this.value);
           alert('Selected Unit: ' + this.value);
       }
   });
    
    // Get references to the dropdown and "Other" input field
    const divisionSelect = document.getElementById('divisionSelect');
    const otherDivisionInput = document.getElementById('otherDivisionInput');

    // Handle dropdown selection changes
    divisionSelect.addEventListener('change', function () {
        const selectedValue = this.value;

        if (selectedValue === 'Other') {
            otherDivisionInput.style.display = 'inline';
            otherDivisionInput.required = true;
        } else {
            otherDivisionInput.style.display = 'none';
            otherDivisionInput.value = '';
            otherDivisionInput.required = false;
            console.log('Selected Division:', selectedValue);
            alert('Selected Division: ' + selectedValue);
        }
    });

    // Handle "Other" input field blur event
    otherDivisionInput.addEventListener('blur', function () {
        if (this.value.trim()) {
            console.log('Selected Division:', this.value);
            alert('Selected Division: ' + this.value);
        }
    });
    document.getElementById("saveAsPdf").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission

        // Gather form data
        const unitSelect = document.querySelector('select[name="type"]').value;
        const otherInput = document.querySelector('input[name="otherType"]').value;

        // Use the "OTHER" input value if applicable
        const unit = unitSelect === "Other" ? otherInput : unitSelect;

        const divisionSelectValue = document.querySelector('select[name="division"]').value;
            const otherInputValue = document.querySelector('input[name="otherDivision"]').value;

            // Use the "Other" input value if applicable
            const division = divisionSelectValue === "Other" ? otherInputValue : divisionSelectValue;


        const formData = {
            // Incident Details
            DateOfIncident: document.querySelector('input[name="Date"]').value,
            TimeOfIncident: document.querySelector('input[name="Time"]').value,
            CallGivenBy: document.querySelector('input[name="call"]').value,

            // Unit and Location
            Unit: unit,
            ExactLocation: document.querySelector('input[name="location"]').value,

            // Incident Type
            TypeOfIncident: document.querySelector('select[name="incident"]').value,
            CallReceivedInFireCR: document.querySelector('input[name="callrecieved"]').value,
            Status: document.querySelector('select[name="status"]').value,

            // Division and Employee Details
            Division: division,
            EmployeeOrContractorName: document.querySelector('input[name="name"]').value,

            // Description
            Description: document.querySelector('textarea[name="description"]').value,

            // Images (captured as Data URLs)
            IncidentLocationPic1: document.querySelector('input[name="profile"]').files[0],
            IncidentLocationPic2: document.querySelector('input[name="profilepic"]').files[0],
        };

        // Function to convert an image file to a Data URL
        function readFileAsDataURL(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(file);
            });
        }

        // Create a PDF document
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        // Add header
        function addHeader() {
            const titleY = 30;
            const headingY = 20;
            const subtitleY = 35; // Adjusted position for subtitle
            const gap = 10; // Adjust this value for desired gap

            // Draw box for the title
            pdf.setFillColor(173, 216, 230);
            pdf.rect(5, headingY - 10, 20, 30, 'S');
            pdf.setFontSize(8);

            // Add image to PDF
            const imageData = 'data:image/png;base64,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'; // Truncated for brevity
            pdf.addImage(imageData, 'PNG', 5, 10.3, 20, 29.6);

            // Main title box
            pdf.setFillColor(255, 255, 255);
            pdf.rect(25, headingY - 10, 130, 25, 'FD');
            pdf.setFontSize(12);
            pdf.text('Hindustan Petroleum Corporation Limited', 95, headingY, { align: 'center' });
            pdf.text('Mumbai Refinery', 95, headingY + 7, { align: 'center' });

            // Subtitle box
            pdf.setFillColor(255, 255, 255);
            pdf.rect(25, subtitleY - 4, 130, 8.8, 'FD');
            pdf.setFontSize(12);
            pdf.text('First Information Report (FIR)', 95, subtitleY + 2, { align: 'center' });
            

            // Set fill color to white
  pdf.setFillColor(255, 255, 255); // White color
  
  // Draw rectangular box on the right side
  const boxWidth = 52;  // Width of the rectangular box
  const boxHeight = 30; // Height of the rectangular box
  const boxX = 153;     // Position from the left edge (right side of the page)
  const boxY = 9.8; // Position vertically, adjusting with titleY
  
  // Create the rectangular box on the right side of the page
  pdf.rect(boxX, boxY, boxWidth, boxHeight, 'FD'); // 'FD' means fill and draw
  
  // Draw metadata text inside the box (aligned to the right)
  pdf.setFontSize(8);
  
  // Position the text within the square box
  const textX = boxX + 1 ; // X position for text, 10 units from the left of the box
  const textY = boxY + 3.5; // Starting Y position for text inside the box
  
  pdf.text('Issue No: 1', textX, textY);
  pdf.text('Issue Date: 6/11/2024', textX, textY + 5);
  pdf.text('Rev No: 0', textX, textY + 10);
  pdf.text('Rev Date:', textX, textY + 15);
  pdf.text('Doc No: HPCL MR/FRM/F&S/08200-12', textX, textY + 20);
  
  // Adjust position for next elements if needed
  // Example of increasing position for further content
  
            return subtitleY + 4 + gap;
        }

        function fieldPairWithBoxes(pdf, label1, value1, label2, value2, yposition) {
            const boxHeight = 10; // Height of the label and value boxes
            const labelWidth = 47; // Width of the label boxes
            const valueWidth = 52; // Width of the value boxes
            const spacing = 2; // Spacing between the label and value boxes, and between pairs
            const leftMargin = 8; // Left margin for the first label
 // First pair of boxes (Label1 and Value1)
 pdf.setDrawColor(0); // Set black border color
 pdf.rect(leftMargin, yposition, labelWidth, boxHeight); // Label1 box
 pdf.rect(leftMargin + labelWidth, yposition, valueWidth, boxHeight); // Value1 box

 // Add text for Label1 and Value1
 // Define label text position with vertical adjustment for centering
const label1FontSize = 11; // Increased font size for label1


// Set font and size
pdf.setFont('Arial', 'B');
pdf.setFontSize(label1FontSize);
 
 pdf.text(label1, leftMargin + 2, yposition + 7); // Add Label1 text
 pdf.setFont('Arial', '', 10); // Regular font for value
 pdf.text(value1, leftMargin + labelWidth + 2, yposition + 7); // Add Value1 text

 // Second pair of boxes (Label2 and Value2), if provided
 if (label2) {
     const secondPairX = 107; // X position for second pair

     pdf.rect(secondPairX, yposition, labelWidth, boxHeight); // Label2 box
     pdf.rect(secondPairX + labelWidth, yposition, valueWidth, boxHeight); // Value2 box

     // Add text for Label2 and Value2
     pdf.setFont('Arial', 'B', 12); // Bold font for label
     pdf.text(label2, secondPairX + 2, yposition + 7); // Add Label2 text
     pdf.setFont('Arial', '', 10); // Regular font for value
     pdf.text(value2, secondPairX + labelWidth + 2, yposition + 7); // Add Value2 text
 }

 return yposition + boxHeight + spacing; // Move to the next row
}

               // Function to add two images side by side in the PDF
async function addImagesSideBySide(pdf, label1, imageFile1, label2, imageFile2, yPosition) {
    const marginX = 12; // Left margin for the first image
    const gap = 20; // Gap between the two images
    const imageWidth = 80; // Width of each image
    const imageHeight = 70; // Height of each image

    // Add labels for the images
    if (label1) pdf.text(label1, marginX, yPosition - 5);
    if (label2) pdf.text(label2, marginX + imageWidth + gap, yPosition - 5);

    // Convert images to Data URLs and add them
    if (imageFile1) {
        const dataURL1 = await readFileAsDataURL(imageFile1);
        pdf.addImage(dataURL1, 'JPEG', marginX, yPosition, imageWidth, imageHeight);
    }
    if (imageFile2) {
        const dataURL2 = await readFileAsDataURL(imageFile2);
        pdf.addImage(dataURL2, 'JPEG', marginX + imageWidth + gap, yPosition, imageWidth, imageHeight);
    }

    // Return the updated yPosition after the images
    return yPosition + imageHeight + 10; // Add space below the images
}


        // Add fields to the PDF
        async function generatePDF() {
            let yposition = addHeader(pdf);
            yposition = fieldPairWithBoxes(pdf, 'Date of Incident:', formData.DateOfIncident ?? '', 'Time of Incident:', formData.TimeOfIncident ?? '', yposition);
            yposition = fieldPairWithBoxes(pdf, 'Call Given By:', formData.CallGivenBy ?? '', 'Unit:', formData.Unit ?? '', yposition);
            yposition = fieldPairWithBoxes(pdf, 'Exact Location:', formData.ExactLocation ?? '', 'Type of Incident:', formData.TypeOfIncident ?? '', yposition);
            yposition = fieldPairWithBoxes(pdf, 'Division:', formData.Division ?? '', 'Employee/Contractor Name:', formData.EmployeeOrContractorName ?? '', yposition);

             //yPosition = addField(pdf, 'Description:', formData.Description, yPosition);
             function addDescriptionBox(pdf, label, value, yPosition) {
                const marginX = 15;
                const labelWidth = 47; // Width of the label box
                const valueWidth = 151; // Width of the text area box
                const boxHeight = 40; // Height of the boxes
            
                // Draw label box
                pdf.rect(8, yPosition, labelWidth, boxHeight);
                pdf.setFont('Arial', '', 14);
                pdf.text(label, 34, yPosition + boxHeight / 2, { align: 'right' });
            
                // Draw value box
                pdf.rect(8 + labelWidth, yPosition, valueWidth, boxHeight);
                pdf.setFont('Arial', '', 12);
            
                // Handle multiline text wrapping for the description
//pdf.setFont('Arial', '', 14); // Set font size to 14 for larger text
const textLines = pdf.splitTextToSize(value || '', valueWidth - 10); // Wrap text to fit the box
const textXStart = 9 + labelWidth + 6.5; // Adjust starting X position to avoid overlapping with the label box
const textYStart = yPosition + 8; // Adjust starting Y position for text inside the box
for (let i = 0; i < textLines.length; i++) {
    const lineHeight = 7; // Increase line height for better spacing
    pdf.text(textLines[i], textXStart, textYStart + i * lineHeight); // Add text inside value box
}

                return yPosition + boxHeight + 10; // Adjust yPosition for the next field
            }
            
            // Usage in generatePDF
            yposition = addDescriptionBox(pdf, 'Description:', formData.Description, yposition);
            
            
            
            
            yposition = 160;
            // Add images
            //yPosition = await addImageToPDF(pdf, 'Incident Location Pic-1:', formData.IncidentLocationPic1, yPosition);
            //yPosition = await addImageToPDF(pdf, 'Incident Location Pic-2:', formData.IncidentLocationPic2, yPosition);
             
    // Add images side by side
    yposition = await addImagesSideBySide(
        pdf,
        'Incident Location Pic-1:',
        formData.IncidentLocationPic1,
        'Incident Location Pic-2:',
        formData.IncidentLocationPic2,
        yposition
    );
            // Add footer with page numbers
            const totalPages = pdf.internal.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                pdf.setFontSize(8);
                pdf.text(`Page ${i} of ${totalPages}`, pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, { align: 'center' });
            }

            pdf.save('FIR_Report.pdf');
        }

        generatePDF();
    });
});

