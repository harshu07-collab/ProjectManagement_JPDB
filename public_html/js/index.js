var connToken = "90935148|-31949241329856406|90958615";
var dbName = "COLLEGE-DB";
var relName = "PROJECT-TABLE";

var recNo = "";

function resetForm() {

    $("#projectId").val("");
    $("#projectName").val("");
    $("#assignedTo").val("");
    $("#assignmentDate").val("");
    $("#deadline").val("");

    $("#projectId").prop("disabled", false);

    $("#projectName").prop("disabled", true);
    $("#assignedTo").prop("disabled", true);
    $("#assignmentDate").prop("disabled", true);
    $("#deadline").prop("disabled", true);

    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);

    $("#projectId").focus();
}

function validateData() {

    var projectId = $("#projectId").val();
    var projectName = $("#projectName").val();
    var assignedTo = $("#assignedTo").val();
    var assignmentDate = $("#assignmentDate").val();
    var deadline = $("#deadline").val();

    if (projectId === "") {
        alert("Project ID Required");
        $("#projectId").focus();
        return "";
    }

    if (projectName === "") {
        alert("Project Name Required");
        $("#projectName").focus();
        return "";
    }

    if (assignedTo === "") {
        alert("Assigned To Required");
        $("#assignedTo").focus();
        return "";
    }

    if (assignmentDate === "") {
        alert("Assignment Date Required");
        $("#assignmentDate").focus();
        return "";
    }

    if (deadline === "") {
        alert("Deadline Required");
        $("#deadline").focus();
        return "";
    }

    var jsonObj = {
        "Project-ID": projectId,
        "Project-Name": projectName,
        "Assigned-To": assignedTo,
        "Assignment-Date": assignmentDate,
        "Deadline": deadline
    };

    return JSON.stringify(jsonObj);
}

function fillData(jsonObj) {

    recNo = jsonObj.rec_no;

    $("#projectName").val(jsonObj.record["Project-Name"]);
    $("#assignedTo").val(jsonObj.record["Assigned-To"]);
    $("#assignmentDate").val(jsonObj.record["Assignment-Date"]);
    $("#deadline").val(jsonObj.record["Deadline"]);
}

function getProject() {

    var projectId = $("#projectId").val();

    if (projectId === "") {
        return;
    }

    var jsonStr = {
        "Project-ID": projectId
    };

    var getRequest = createGET_BY_KEYRequest(
            connToken,
            dbName,
            relName,
            JSON.stringify(jsonStr)
            );

    jQuery.ajaxSetup({async: false});

    var resultObj = executeCommandAtGivenBaseUrl(
            getRequest,
            "http://api.login2explore.com:5577",
            "/api/irl"
            );

    jQuery.ajaxSetup({async: true});

    if (!resultObj || !resultObj.data || resultObj.data === "") {

        $("#projectName").prop("disabled", false);
        $("#assignedTo").prop("disabled", false);
        $("#assignmentDate").prop("disabled", false);
        $("#deadline").prop("disabled", false);

        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);

        $("#projectName").focus();

        return;
    }

    var data = JSON.parse(resultObj.data);

    if (data.rec_no === undefined) {

        $("#projectName").prop("disabled", false);
        $("#assignedTo").prop("disabled", false);
        $("#assignmentDate").prop("disabled", false);
        $("#deadline").prop("disabled", false);

        $("#saveBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);

        $("#projectName").focus();

    } else {

        fillData(data);

        $("#projectId").prop("disabled", true);

        $("#projectName").prop("disabled", false);
        $("#assignedTo").prop("disabled", false);
        $("#assignmentDate").prop("disabled", false);
        $("#deadline").prop("disabled", false);

        $("#updateBtn").prop("disabled", false);
        $("#resetBtn").prop("disabled", false);

        $("#projectName").focus();
    }
}

function saveData() {

    var jsonStr = validateData();

    if (jsonStr === "") {
        return;
    }

    var putRequest = createPUTRequest(
            connToken,
            jsonStr,
            dbName,
            relName
            );

    jQuery.ajaxSetup({async: false});

    executeCommandAtGivenBaseUrl(
            putRequest,
            "http://api.login2explore.com:5577",
            "/api/iml"
            );

    jQuery.ajaxSetup({async: true});

    alert("Project Saved Successfully");

    resetForm();
}

function updateData() {

    var jsonStr = validateData();

    if (jsonStr === "") {
        return;
    }

    var updateRequest = createUPDATERecordRequest(
            connToken,
            jsonStr,
            dbName,
            relName,
            recNo
            );

    jQuery.ajaxSetup({async: false});

    executeCommandAtGivenBaseUrl(
            updateRequest,
            "http://api.login2explore.com:5577",
            "/api/iml"
            );

    jQuery.ajaxSetup({async: true});

    alert("Project Updated Successfully");

    resetForm();
}