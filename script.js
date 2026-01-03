// Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Add active class to clicked nav link
    event.target.classList.add('active');
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const isDark = document.getElementById('themeToggle').checked;
    
    if (isDark) {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
    }
}

// Consent Manager
function updateConsentPreview() {
    const text = document.getElementById('consentText').value;
    document.getElementById('consentPreviewText').textContent = text;
    alert('✓ Consent configuration saved successfully!');
}

function publishConsent() {
    alert('✓ Consent banner published live! All users will see the updated consent notice.');
}

// Request Filters
function filterRequests() {
    const typeFilter = document.getElementById('typeFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const rows = document.querySelectorAll('#requestsTable tbody tr');
    
    rows.forEach(row => {
        const type = row.getAttribute('data-type');
        const status = row.getAttribute('data-status');
        
        const typeMatch = typeFilter === 'all' || type === typeFilter;
        const statusMatch = statusFilter === 'all' || status === statusFilter;
        
        if (typeMatch && statusMatch) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Request Details Modal
function viewRequestDetails(id, type, user, date, status) {
    document.getElementById('modalRequestId').textContent = id;
    document.getElementById('modalRequestType').innerHTML = `<span class="badge badge-info">${type}</span>`;
    document.getElementById('modalUserId').textContent = user;
    document.getElementById('modalDate').textContent = date;
    
    // Timeline dates
    const submitDate = new Date(date);
    document.getElementById('timelineSubmitted').textContent = submitDate.toLocaleDateString('en-IN');
    
    const verifyDate = new Date(submitDate);
    verifyDate.setDate(verifyDate.getDate() + 1);
    document.getElementById('timelineVerified').textContent = verifyDate.toLocaleDateString('en-IN');
    
    const processDate = new Date(submitDate);
    processDate.setDate(processDate.getDate() + 3);
    document.getElementById('timelineProcessing').textContent = processDate.toLocaleDateString('en-IN');
    
    // Update timeline based on status
    if (status === 'Pending') {
        document.getElementById('timelineProcessingItem').classList.add('pending');
    } else if (status === 'Processing') {
        document.getElementById('timelineProcessingItem').classList.remove('pending');
        document.getElementById('timelineCompletedItem').classList.add('pending');
    } else {
        document.getElementById('timelineProcessingItem').classList.remove('pending');
        document.getElementById('timelineCompletedItem').classList.remove('pending');
    }
    
    document.getElementById('requestModal').classList.add('active');
}

function closeModal() {
    document.getElementById('requestModal').classList.remove('active');
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('requestModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize Charts
window.onload = function() {
    // Requests Bar Chart
    const requestsCtx = document.getElementById('requestsChart').getContext('2d');
    new Chart(requestsCtx, {
        type: 'bar',
        data: {
            labels: ['Access', 'Erasure', 'Correction'],
            datasets: [{
                label: 'Number of Requests',
                data: [45, 28, 17],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: [
                    'rgb(37, 99, 235)',
                    'rgb(239, 68, 68)',
                    'rgb(245, 158, 11)'
                ],
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

    // Consent Donut Chart
    const consentCtx = document.getElementById('consentChart').getContext('2d');
    new Chart(consentCtx, {
        type: 'doughnut',
        data: {
            labels: ['Accepted', 'Rejected', 'Withdrawn'],
            datasets: [{
                data: [2847, 412, 156],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: [
                    'rgb(16, 185, 129)',
                    'rgb(239, 68, 68)',
                    'rgb(245, 158, 11)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
};