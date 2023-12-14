// index.mjs

const sendStudentMarks = async (event) => {
    // Mocked student data
    const studentMarks = {
        "Alice": {"math": 85, "science": 78, "history": 92},
        "Bob": {"math": 90, "science": 82, "history": 88},
        "Charlie": {"math": 78, "science": 80, "history": 85}
    };

    // Extract the student name from the incoming event
    const studentName = event.student_name;

    // If the student name is provided in the event, fetch their marks
    if (studentName) {
        if (studentMarks.hasOwnProperty(studentName)) {
            const marks = studentMarks[studentName];
            // Here, you could implement code to send an email with the marks
            // For example:
            // sendEmail(studentName, marks);
            return {
                statusCode: 200,
                body: JSON.stringify({ message: `Marks sent for ${studentName}: ${JSON.stringify(marks)}` })
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: `Student ${studentName} not found` })
            };
        }
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Please provide a student_name' })
        };
    }
};

const handler = async (event) => {
    try {
        // Your logic to handle the incoming event
        const response = await sendStudentMarks(event);
        return response;
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

// Example invocation:
const event = { student_name: "Alice" }; // Mocked event
handler(event)
    .then(response => console.log(response))
    .catch(error => console.error(error));

export { handler };
