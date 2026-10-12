
"use strict";

const form = document.getElementById("contact-form");
const response = document.getElementById("form-response");
const fileList = document.getElementById("file-list");
const submitButton = document.getElementById("submit-button");

const fileInputs = [
    document.getElementById("attachment1"),
    document.getElementById("attachment2"),
    document.getElementById("attachment3")
];

const MAX_TOTAL_SIZE = 10 * 1024 * 1024;

function formatFileSize(bytes) {
    if (bytes < 1024) {
        return bytes + " B";
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function getSelectedFiles() {
    const files = [];

    fileInputs.forEach(function (input) {
        if (input && input.files) {
            Array.from(input.files).forEach(function (file) {
                files.push(file);
            });
        }
    });

    return files;
}

function updateFileList() {
    const files = getSelectedFiles();

    if (files.length === 0) {
        fileList.textContent = "No files selected.";
        return;
    }

    const totalSize = files.reduce(function (total, file) {
        return total + file.size;
    }, 0);

    fileList.textContent =
        files.length + " file(s) selected | Total: " +
        formatFileSize(totalSize);

    files.forEach(function (file) {
        const line = document.createElement("div");

        line.textContent =
            "• " + file.name + " (" + formatFileSize(file.size) + ")";

        fileList.appendChild(line);
    });
}

function showMessage(message, type) {
    response.textContent = message;
    response.className = type;
}

fileInputs.forEach(function (input) {
    input.addEventListener("change", function () {
        updateFileList();
        showMessage("", "");

        const files = getSelectedFiles();

        const totalSize = files.reduce(function (total, file) {
            return total + file.size;
        }, 0);

        if (totalSize > MAX_TOTAL_SIZE) {
            showMessage(
                "The selected files exceed the 10 MB total limit. " +
                "Please remove some files.",
                "error"
            );
        }
    });
});

form.addEventListener("submit", function (event) {
    const files = getSelectedFiles();

    const totalSize = files.reduce(function (total, file) {
        return total + file.size;
    }, 0);

    if (totalSize > MAX_TOTAL_SIZE) {
        event.preventDefault();

        showMessage(
            "Cannot send: your attachments exceed 10 MB in total.",
            "error"
        );

        return;
    }

    if (!form.checkValidity()) {
        event.preventDefault();
        form.reportValidity();
        return;
    }

    showMessage(
        "Submitting your message and attachments. Please wait...",
        "info"
    );

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
});

window.addEventListener("pageshow", function () {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message ↗";
});
