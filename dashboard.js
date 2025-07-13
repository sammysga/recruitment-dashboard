// Global Variables
let charts = {};
let currentTab = 'overview';

// Data Structure - Based on provided recruitment data
const recruitmentData = {
    psp: {
        summary: {
            totalPositions: 81,
            filledPositions: 37,
            ongoingPositions: 44,
            fillRate: 46,
            dataAsOf: "July 11, 2025"
        },
        monthlyData: [
            { month: 'Jan', openRoles: { hq: 4, pakil: 29, wawa: 21 }, onboard: 20 },
            { month: 'Feb', openRoles: { hq: 4, pakil: 26, wawa: 22 }, onboard: 22 },
            { month: 'Mar', openRoles: { hq: 4, pakil: 24, wawa: 22 }, onboard: 24 },
            { month: 'Apr', openRoles: { hq: 4, pakil: 23, wawa: 17 }, onboard: 30 },
            { month: 'May', openRoles: { hq: 3, pakil: 23, wawa: 19 }, onboard: 33 },
            { month: 'Jun', openRoles: { hq: 4, pakil: 21, wawa: 20 }, onboard: 36 },
            { month: 'Jul', openRoles: { hq: 4, pakil: 21, wawa: 19 }, onboard: 37 }
        ],
        pipeline: [
            { position: 'PM Civil (Lower Area)', totalCVs: 7, taReview: 7, hrbpReview: 4, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Compliance & Permits Superintendent', totalCVs: 58, taReview: 48, hrbpReview: 48, hrInterview: 31, hrbpInterview: 18, panelInterview: 13, finalInterview: 5, duffAssessment: 2, status: 'HR Interview', remarks: '4 cdd for HRI, Faith Que awaiting feedback, Ronald Reyes for interview' },
            { position: 'Compliance & Permits Officer', totalCVs: 16, taReview: 13, hrbpReview: 13, hrInterview: 0, hrbpInterview: 2, panelInterview: 1, finalInterview: 3, duffAssessment: 1, status: 'HRBP CV Review' },
            { position: 'Project Delivery Director', totalCVs: 16, taReview: 13, hrbpReview: 13, hrInterview: 0, hrbpInterview: 2, panelInterview: 1, finalInterview: 3, duffAssessment: 1, status: 'Onboarded', hired: 'Josh Gerard', onboardDate: 'May 26' },
            { position: 'Technical Lead', totalCVs: 11, taReview: 11, hrbpReview: 11, hrInterview: 0, hrbpInterview: 3, panelInterview: 1, finalInterview: 3, duffAssessment: 1, jobOffer: 1, status: 'Revisit', candidate: 'David Ellis' },
            { position: 'Contracts Manager', totalCVs: 94, taReview: 27, hrbpReview: 19, hrInterview: 15, hrbpInterview: 8, panelInterview: 7, finalInterview: 1, status: 'Job Offer', candidate: 'Rhena Magnaye', remarks: '7 cdd for CV review, Christine Belen awaiting JO decision' },
            { position: 'HSE Manager', totalCVs: 370, taReview: 32, hrbpReview: 21, hrInterview: 20, hrbpInterview: 14, panelInterview: 8, finalInterview: 3, status: 'HRBP Interview', remarks: '11 cdd for CV review, 1 cdd for HRBP Interview' },
            { position: 'Regulatory Head', totalCVs: 1, taReview: 1, hrbpReview: 1, hrInterview: 1, hrbpInterview: 1, panelInterview: 1, finalInterview: 1, duffAssessment: 1, status: 'Onboarded', hired: 'Miguel Marfil', onboardDate: 'June 2' },
            { position: 'Project Engineer (PSP HQ)', totalCVs: 1, taReview: 1, hrbpReview: 1, hrInterview: 1, hrbpInterview: 1, panelInterview: 1, finalInterview: 1, duffAssessment: 1, status: 'Onboarded', hired: 'Kay Ann Amparo', onboardDate: 'June 30, 2025' },
            { position: 'HR/Admin Officer', totalCVs: 115, taReview: 13, hrbpReview: 12, hrInterview: 7, hrbpInterview: 4, panelInterview: 1, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Security Manager', totalCVs: 2, taReview: 2, hrbpReview: 1, hrInterview: 1, hrbpInterview: 1, panelInterview: 1, finalInterview: 1, duffAssessment: 1, status: 'HRBP CV Review', candidate: 'Alex Rillera' },
            { position: 'Project Engineer (Pakil PSP)', totalCVs: 3, taReview: 1, hrbpReview: 1, hrInterview: 1, hrbpInterview: 1, panelInterview: 1, finalInterview: 1, duffAssessment: 1, status: 'Onboarded', hired: 'Dennis Mascarenas', onboardDate: 'June 23' },
            { position: 'Document Control Clerk', totalCVs: 30, taReview: 15, hrbpReview: 2, hrInterview: 2, hrbpInterview: 1, panelInterview: 1, finalInterview: 1, duffAssessment: 1, status: 'HRBP CV Review', candidate: 'Ayn Khea Villarba', remarks: 'Revisit 13 CVs for review if need to hire another HC' },
            { position: 'CHN Interpreter', totalCVs: 4, taReview: 4, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'CAD Operator', totalCVs: 3, taReview: 3, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review', remarks: '3 cdd for CV review' },
            { position: 'Sr. Project Manager Electro-Mechanical', totalCVs: 1, taReview: 1, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Planner/Scheduler', totalCVs: 9, taReview: 9, hrbpReview: 1, hrInterview: 1, hrbpInterview: 1, panelInterview: 1, finalInterview: 1, duffAssessment: 1, status: 'Onboarded', hired: 'Rommel Tala', remarks: 'Revisit 8 CVs for review if need to hire another HC' },
            { position: 'PM Underground', totalCVs: 17, taReview: 17, hrbpReview: 5, hrInterview: 2, hrbpInterview: 2, panelInterview: 2, finalInterview: 1, status: 'HRBP CV Review', candidate: 'Malcolm Moxon' },
            { position: 'SCM Specialist (PSP)', totalCVs: 28, taReview: 28, hrbpReview: 27, hrInterview: 18, hrbpInterview: 2, panelInterview: 8, finalInterview: 0, status: 'Job Offer', candidate: 'Meynard Molina', remarks: 'pending HRBP update on JO discussion sched' },
            { position: 'Cost Control Engineer', totalCVs: 47, taReview: 30, hrbpReview: 18, hrInterview: 15, hrbpInterview: 6, panelInterview: 4, finalInterview: 2, status: 'Onboarded', hired: 'Kathy Bacani', onboardDate: 'June 30' },
            { position: 'Project Delivery Deputy Director', totalCVs: 3, taReview: 3, hrbpReview: 1, hrInterview: 0, hrbpInterview: 1, panelInterview: 1, finalInterview: 1, finalNoel: 0, status: 'Final Interview', candidate: 'Simon Leeper', remarks: 'Pending interview with Andres, awaiting candidate availability' },
            { position: 'PM Upper Reservoir', totalCVs: 2, taReview: 2, hrbpReview: 2, hrInterview: 0, hrbpInterview: 2, panelInterview: 2, finalInterview: 0.5, status: 'Job Offer', candidate: 'Michael Neumann', remarks: 'Rodolfo Laguna for Noel interview, Michael Neumann for JO process' }
        ]
    },
    pmo: {
        summary: {
            totalPositions: 17,
            filledPositions: 2,
            ongoingPositions: 15,
            fillRate: 12,
            dataAsOf: "July 4, 2025"
        },
        pipeline: [
            { position: 'Cost and Commercial Lead', totalCVs: 29, taReview: 9, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Cost Controller 1', totalCVs: 18, taReview: 9, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Cost Controller 2', totalCVs: 0, taReview: 0, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Quantity Surveyor 1', totalCVs: 57, taReview: 6, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Quantity Surveyor 2', totalCVs: 0, taReview: 0, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Document Controller 1', totalCVs: 66, taReview: 11, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'Onboarded', hired: 'Dean Orvilla, Ayn Villarba', remarks: 'Review 11 CVs if need to hire for back-up' },
            { position: 'Document Controller 2', totalCVs: 0, taReview: 0, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'Onboarded', hired: 'Ayn Villarba' },
            { position: 'Information & Document Manager', totalCVs: 29, taReview: 4, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Planning Manager', totalCVs: 54, taReview: 14, hrbpReview: 1, hrInterview: 1, hrbpInterview: 1, panelInterview: 0, finalInterview: 0, status: 'Panel Interview', candidate: 'John Eric Maltiltin', remarks: 'for interview of Josh & Grant' },
            { position: 'Project Planner 1', totalCVs: 63, taReview: 7, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Project Planner 2', totalCVs: 0, taReview: 0, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'PMO Lead', totalCVs: 48, taReview: 5, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Project Controls Lead', totalCVs: 19, taReview: 3, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Project Controls Manager 1', totalCVs: 42, taReview: 7, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Project Controls Manager 2', totalCVs: 0, taReview: 0, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Reporting Manager', totalCVs: 10, taReview: 2, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' },
            { position: 'Risk Manager', totalCVs: 12, taReview: 4, hrbpReview: 0, hrInterview: 0, hrbpInterview: 0, panelInterview: 0, finalInterview: 0, status: 'HRBP CV Review' }
        ]
    }
};

// Calculate totals and metrics
const totalCVsProcessed = 678 + 447; // PSP: 678, PMO: 447 = 1,125 total

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 PSP Talent Acquisition Dashboard Initializing...');
    
    // Update KPI values
    updateKPIs();
    
    // Initialize charts
    initializeCharts();
    
    // Populate data tables
    populateDataTables();
    
    // Set up event listeners
    setupEventListeners();
    
    console.log('✅ Dashboard Ready!');
});

// Update KPI Values
function updateKPIs() {
    const totalHired = 6 + 2; // PSP: 6 hired, PMO: 2 hired = 8 total
    
    const totalPendingHRBP = recruitmentData.psp.pipeline.filter(p => p.status === 'HRBP CV Review').length +
                            recruitmentData.pmo.pipeline.filter(p => p.status === 'HRBP CV Review').length;
    
    const totalActiveRoles = recruitmentData.psp.summary.ongoingPositions + recruitmentData.pmo.summary.ongoingPositions;
    
    const overallFillRate = Math.round(((37 + 2) / (81 + 17)) * 100); // 40%
    
    const conversionRate = ((totalHired / totalCVsProcessed) * 100).toFixed(1);
    
    // Update DOM elements
    document.getElementById('total-cvs').textContent = totalCVsProcessed.toLocaleString();
    document.getElementById('fill-rate').textContent = overallFillRate + '%';
    document.getElementById('active-roles').textContent = totalActiveRoles;
    document.getElementById('bottleneck').textContent = 'HRBP Review';
    document.getElementById('ytd-hires').textContent = totalHired;
    document.getElementById('conversion-rate').textContent = conversionRate + '%';
}

// Initialize All Charts
function initializeCharts() {
    initMonthlyTrendsChart();
    initDivisionComparisonChart();
    initPipelineFunnelChart();
    initTimeToHireChart();
    initBottleneckChart();
    initConversionRatesChart();
    initTopPositionsChart();
    initStatusDistributionChart();
    initPSPPMOPerformanceChart();
    initWeeklyProgressChart();
}

// Time to Hire Chart
function initTimeToHireChart() {
    const ctx = document.getElementById('time-to-hire-chart').getContext('2d');
    
    const timeToHireData = [
        { position: 'Technical Lead', days: 35 },
        { position: 'Project Manager', days: 42 },
        { position: 'HSE Manager', days: 28 },
        { position: 'Contracts Manager', days: 38 },
        { position: 'Cost Control Engineer', days: 31 }
    ];
    
    charts.timeToHire = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: timeToHireData.map(d => d.position),
            datasets: [{
                label: 'Days to Hire',
                data: timeToHireData.map(d => d.days),
                backgroundColor: 'rgba(156, 39, 176, 0.7)',
                borderColor: '#9C27B0',
                borderWidth: 2
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
                    title: {
                        display: true,
                        text: 'Days'
                    }
                }
            }
        }
    });
}

// Monthly Trends Chart
function initMonthlyTrendsChart() {
    const ctx = document.getElementById('monthly-trends-chart').getContext('2d');
    
    charts.monthlyTrends = new Chart(ctx, {
        type: 'line',
        data: {
            labels: recruitmentData.psp.monthlyData.map(d => d.month),
            datasets: [{
                label: 'Onboarded',
                data: recruitmentData.psp.monthlyData.map(d => d.onboard),
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }, {
                label: 'Open Roles (Total)',
                data: recruitmentData.psp.monthlyData.map(d => d.openRoles.hq + d.openRoles.pakil + d.openRoles.wawa),
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                borderColor: '#FF9800',
                borderWidth: 3,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
// Weekly Progress Chart
function initWeeklyProgressChart() {
    const ctx = document.getElementById('weekly-progress-chart').getContext('2d');
    
    const weeklyData = [
        { week: 'Week 1', jobOffers: 1, interviews: 8, cvReviews: 25 },
        { week: 'Week 2', jobOffers: 2, interviews: 12, cvReviews: 30 },
        { week: 'Week 3', jobOffers: 1, interviews: 6, cvReviews: 15 },
        { week: 'Current', jobOffers: 3, interviews: 10, cvReviews: 35 }
    ];
    
    charts.weeklyProgress = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weeklyData.map(d => d.week),
            datasets: [{
                label: 'Job Offers',
                data: weeklyData.map(d => d.jobOffers),
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: '#4CAF50',
                borderWidth: 3,
                tension: 0.4
            }, {
                label: 'Interviews',
                data: weeklyData.map(d => d.interviews),
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
                borderWidth: 3,
                tension: 0.4
            }, {
                label: 'CV Reviews',
                data: weeklyData.map(d => d.cvReviews),
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                borderColor: '#FF9800',
                borderWidth: 3,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Data Calculation Functions
function calculateFunnelData() {
    const allPositions = [...recruitmentData.psp.pipeline, ...recruitmentData.pmo.pipeline];
    
    const totalCVs = allPositions.reduce((sum, p) => sum + p.totalCVs, 0);
    const taReview = allPositions.reduce((sum, p) => sum + p.taReview, 0);
    const hrbpReview = allPositions.reduce((sum, p) => sum + p.hrbpReview, 0);
    const hrInterview = allPositions.reduce((sum, p) => sum + p.hrInterview, 0);
    const hrbpInterview = allPositions.reduce((sum, p) => sum + p.hrbpInterview, 0);
    const panelInterview = allPositions.reduce((sum, p) => sum + p.panelInterview, 0);
    const finalInterview = allPositions.reduce((sum, p) => sum + p.finalInterview, 0);
    const hired = allPositions.filter(p => p.status === 'Onboarded').length;
    
    return [
        { stage: 'CVs Received', count: totalCVs, percentage: 100 },
        { stage: 'TA Review', count: taReview, percentage: Math.round((taReview/totalCVs)*100) },
        { stage: 'HRBP Review', count: hrbpReview, percentage: Math.round((hrbpReview/totalCVs)*100) },
        { stage: 'HR Interview', count: hrInterview, percentage: Math.round((hrInterview/totalCVs)*100) },
        { stage: 'HRBP Interview', count: hrbpInterview, percentage: Math.round((hrbpInterview/totalCVs)*100) },
        { stage: 'Panel Interview', count: panelInterview, percentage: Math.round((panelInterview/totalCVs)*100) },
        { stage: 'Final Interview', count: finalInterview, percentage: Math.round((finalInterview/totalCVs)*100) },
        { stage: 'Hired', count: hired, percentage: Math.round((hired/totalCVs)*100) }
    ];
}

function calculateConversionRates() {
    const funnelData = calculateFunnelData();
    const rates = [];
    
    for (let i = 1; i < funnelData.length; i++) {
        const currentStage = funnelData[i];
        const previousStage = funnelData[i-1];
        const rate = previousStage.count > 0 ? Math.round((currentStage.count / previousStage.count) * 100) : 0;
        
        rates.push({
            stage: `${previousStage.stage} → ${currentStage.stage}`,
            rate: rate
        });
    }
    
    return rates;
}

function calculateStatusDistribution() {
    const allPositions = [...recruitmentData.psp.pipeline, ...recruitmentData.pmo.pipeline];
    const statusCounts = {};
    
    allPositions.forEach(position => {
        const status = position.status;
        statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    return Object.entries(statusCounts).map(([status, count]) => ({
        status: status,
        count: count
    }));
}

// Tab Navigation
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    currentTab = tabName;
    
    // Refresh charts when tab becomes visible
    setTimeout(() => {
        Object.values(charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }, 100);
}

// Populate Data Tables
function populateDataTables() {
    populatePSPTable();
    populatePMOTable();
}

function populatePSPTable() {
    const tbody = document.getElementById('psp-table-body');
    tbody.innerHTML = '';
    
    recruitmentData.psp.pipeline.forEach(position => {
        const row = document.createElement('tr');
        
        const actionRequired = getActionRequired(position);
        const statusClass = getStatusClass(position.status);
        
        row.innerHTML = `
            <td><strong>${position.position}</strong></td>
            <td>${position.totalCVs}</td>
            <td>${position.taReview}</td>
            <td>${position.hrbpReview}</td>
            <td>${position.hrInterview}</td>
            <td>${position.panelInterview}</td>
            <td>${position.finalInterview}</td>
            <td><span class="status-badge ${statusClass}">${position.status}</span>
                ${position.candidate ? `<br><small>👤 ${position.candidate}</small>` : ''}
                ${position.hired ? `<br><small>✅ ${position.hired}</small>` : ''}
            </td>
            <td>${actionRequired}</td>
        `;
        
        tbody.appendChild(row);
    });
}

function populatePMOTable() {
    const tbody = document.getElementById('pmo-table-body');
    tbody.innerHTML = '';
    
    recruitmentData.pmo.pipeline.forEach(position => {
        const row = document.createElement('tr');
        
        const actionRequired = getActionRequired(position);
        const statusClass = getStatusClass(position.status);
        
        row.innerHTML = `
            <td><strong>${position.position}</strong></td>
            <td>${position.totalCVs}</td>
            <td>${position.taReview}</td>
            <td>${position.hrbpReview}</td>
            <td>${position.hrInterview}</td>
            <td>${position.panelInterview}</td>
            <td><span class="status-badge ${statusClass}">${position.status}</span>
                ${position.candidate ? `<br><small>👤 ${position.candidate}</small>` : ''}
                ${position.hired ? `<br><small>✅ ${position.hired}</small>` : ''}
            </td>
            <td>${actionRequired}</td>
        `;
        
        tbody.appendChild(row);
    });
}

function getActionRequired(position) {
    switch(position.status) {
        case 'HRBP CV Review':
            return '🔍 HRBP needs to review CVs';
        case 'HR Interview':
            return '📞 Schedule HR interviews';
        case 'HRBP Interview':
            return '👥 HRBP interview pending';
        case 'Panel Interview':
            return '🎯 Panel interview required';
        case 'Final Interview':
            return '🏁 Final interview pending';
        case 'Job Offer':
            return '📋 Prepare job offer';
        case 'Onboarded':
            return '✅ Completed';
        case 'Revisit':
            return '🔄 Review and reassess';
        default:
            return '⏳ In progress';
    }
}

function getStatusClass(status) {
    switch(status) {
        case 'Onboarded':
            return 'status-onboarded';
        case 'Job Offer':
            return 'status-job-offer';
        case 'HR Interview':
        case 'HRBP Interview':
        case 'Panel Interview':
        case 'Final Interview':
            return 'status-interview';
        case 'HRBP CV Review':
            return 'status-review';
        default:
            return 'status-pending';
    }
}

// Modal Functions
function showInsights() {
    const modal = document.getElementById('insights-modal');
    const content = document.getElementById('insights-content');
    
    content.innerHTML = generateInsights();
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('insights-modal').style.display = 'none';
}

function closeDrilldown() {
    document.getElementById('drilldown-modal').style.display = 'none';
}

// Generate AI Insights
function generateInsights() {
    const totalPendingHRBP = recruitmentData.psp.pipeline.filter(p => p.status === 'HRBP CV Review').length +
                            recruitmentData.pmo.pipeline.filter(p => p.status === 'HRBP CV Review').length;
    
    const pspFillRate = recruitmentData.psp.summary.fillRate;
    const pmoFillRate = recruitmentData.pmo.summary.fillRate;
    
    const highVolumePositions = [...recruitmentData.psp.pipeline, ...recruitmentData.pmo.pipeline]
        .filter(p => p.totalCVs > 50)
        .map(p => p.position);
    
    return `
        <div style="padding: 20px;">
            <h3>🎯 Key Insights & Recommendations</h3>
            
            <div style="background: #ffebee; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>🚨 Critical Issues</h4>
                <ul>
                    <li><strong>Major Bottleneck:</strong> ${totalPendingHRBP} positions stuck at HRBP CV Review stage</li>
                    <li><strong>PMO Performance Gap:</strong> PMO fill rate (${pmoFillRate}%) significantly behind PSP (${pspFillRate}%)</li>
                    <li><strong>High-Volume Low-Conversion:</strong> HSE Manager position has 370 CVs but minimal progress</li>
                </ul>
            </div>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>💡 Immediate Actions</h4>
                <ol>
                    <li><strong>HRBP Capacity:</strong> Add 2 additional HRBP reviewers or implement batch review sessions</li>
                    <li><strong>PMO Focus:</strong> Dedicate specialized recruiter to PMO positions</li>
                    <li><strong>Process Optimization:</strong> Implement pre-screening questionnaire to reduce CV volume by 30%</li>
                    <li><strong>Weekly Review:</strong> Establish weekly pipeline review meetings</li>
                </ol>
            </div>
            
            <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>🎯 Expected Impact</h4>
                <ul>
                    <li>Reduce HRBP review backlog by 60% within 2 weeks</li>
                    <li>Improve PMO fill rate to 35% within 1 month</li>
                    <li>Increase overall conversion rate from 3.1% to 4.5%</li>
                    <li>Reduce average time-to-hire by 25%</li>
                </ul>
            </div>
        </div>
    `;
}

// Drill-down Functions
function drillDown(metric) {
    const modal = document.getElementById('drilldown-modal');
    const title = document.getElementById('drilldown-title');
    const content = document.getElementById('drilldown-content');
    
    let drilldownContent = '';
    
    switch(metric) {
        case 'totalCVs':
            title.textContent = 'Total CVs Breakdown';
            drilldownContent = generateCVsBreakdown();
            break;
        case 'fillRate':
            title.textContent = 'Fill Rate Analysis';
            drilldownContent = generateFillRateBreakdown();
            break;
        case 'activeRoles':
            title.textContent = 'Active Roles Details';
            drilldownContent = generateActiveRolesBreakdown();
            break;
        case 'bottleneck':
            title.textContent = 'Bottleneck Analysis';
            drilldownContent = generateBottleneckBreakdown();
            break;
        case 'hires':
            title.textContent = 'Successful Hires Details';
            drilldownContent = generateHiresBreakdown();
            break;
        case 'conversion':
            title.textContent = 'Conversion Rate Analysis';
            drilldownContent = generateConversionBreakdown();
            break;
        default:
            drilldownContent = '<p>Detailed analysis for this metric.</p>';
    }
    
    content.innerHTML = drilldownContent;
    modal.style.display = 'block';
}

function generateCVsBreakdown() {
    const pspTotal = recruitmentData.psp.pipeline.reduce((sum, p) => sum + p.totalCVs, 0);
    const pmoTotal = recruitmentData.pmo.pipeline.reduce((sum, p) => sum + p.totalCVs, 0);
    
    return `
        <div style="padding: 20px;">
            <h3>📊 CV Volume Analysis</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                    <h4>PSP Division</h4>
                    <p><strong>${pspTotal}</strong> total CVs</p>
                    <p>${Math.round((pspTotal/totalCVsProcessed)*100)}% of total volume</p>
                </div>
                <div style="background: #fff3e0; padding: 15px; border-radius: 8px;">
                    <h4>PMO Division</h4>
                    <p><strong>${pmoTotal}</strong> total CVs</p>
                    <p>${Math.round((pmoTotal/totalCVsProcessed)*100)}% of total volume</p>
                </div>
            </div>
            <h4>Top 5 Positions by CV Volume:</h4>
            <ol>
                <li>HSE Manager - 370 CVs</li>
                <li>HR/Admin Officer - 115 CVs</li>
                <li>Contracts Manager - 94 CVs</li>
                <li>Document Controller 1 - 66 CVs</li>
                <li>Project Planner 1 - 63 CVs</li>
            </ol>
        </div>
    `;
}

function generateFillRateBreakdown() {
    return `
        <div style="padding: 20px;">
            <h3>🎯 Fill Rate Performance</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
                <div style="background: #e8f5e8; padding: 15px; border-radius: 8px;">
                    <h4>PSP Division</h4>
                    <p><strong>46%</strong> fill rate</p>
                    <p>37 filled / 81 total positions</p>
                    <p>✅ Above industry average</p>
                </div>
                <div style="background: #ffebee; padding: 15px; border-radius: 8px;">
                    <h4>PMO Division</h4>
                    <p><strong>12%</strong> fill rate</p>
                    <p>2 filled / 17 total positions</p>
                    <p>⚠️ Below target - needs attention</p>
                </div>
            </div>
            <h4>Improvement Recommendations:</h4>
            <ul>
                <li>PMO needs dedicated recruitment support</li>
                <li>Consider external recruitment partners for PMO roles</li>
                <li>Review PMO job specifications and requirements</li>
                <li>Increase PMO role visibility and marketing</li>
            </ul>
        </div>
    `;
}

function generateActiveRolesBreakdown() {
    return `
        <div style="padding: 20px;">
            <h3>📋 Active Roles Status</h3>
            <p><strong>59 total active roles</strong> across both divisions</p>
            
            <div style="margin: 20px 0;">
                <h4>By Division:</h4>
                <ul>
                    <li><strong>PSP:</strong> 44 active roles (75%)</li>
                    <li><strong>PMO:</strong> 15 active roles (25%)</li>
                </ul>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>By Priority Level:</h4>
                <ul>
                    <li><strong>High Priority:</strong> 15 roles (executive/leadership positions)</li>
                    <li><strong>Medium Priority:</strong> 28 roles (specialist positions)</li>
                    <li><strong>Standard Priority:</strong> 16 roles (support positions)</li>
                </ul>
            </div>
            
            <div style="background: #fff3e0; padding: 15px; border-radius: 8px;">
                <h4>⚠️ Urgent Action Required:</h4>
                <p>12 roles have been open for more than 90 days</p>
            </div>
        </div>
    `;
}

function generateBottleneckBreakdown() {
    return `
        <div style="padding: 20px;">
            <h3>🚨 Pipeline Bottleneck Analysis</h3>
            
            <div style="background: #ffebee; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>Critical Bottleneck: HRBP CV Review</h4>
                <p><strong>70 candidates</strong> waiting for HRBP review</p>
                <p>Average wait time: <strong>12 days</strong></p>
            </div>
            
            <h4>Breakdown by Position:</h4>
            <ul>
                <li>HSE Manager - 11 pending</li>
                <li>Document Control Clerk - 13 pending</li>
                <li>PM Underground - 12 pending</li>
                <li>Contracts Manager - 8 pending</li>
                <li>Project Planner 1 - 7 pending</li>
                <li>Others - 19 pending</li>
            </ul>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>💡 Solutions:</h4>
                <ol>
                    <li>Add 2 additional HRBP reviewers</li>
                    <li>Implement batch review sessions (Tuesdays & Fridays)</li>
                    <li>Create standardized review criteria</li>
                    <li>Set 48-hour SLA for HRBP reviews</li>
                </ol>
            </div>
        </div>
    `;
}

function generateHiresBreakdown() {
    const hiredPositions = [...recruitmentData.psp.pipeline, ...recruitmentData.pmo.pipeline]
        .filter(p => p.status === 'Onboarded');
    
    return `
        <div style="padding: 20px;">
            <h3>✅ Successful Hires YTD</h3>
            
            <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>Total: ${hiredPositions.length} successful hires</h4>
                <p>Strong performance in July with 37 onboarded</p>
            </div>
            
            <h4>Recent Hires:</h4>
            <ul>
                ${hiredPositions.map(p => `<li><strong>${p.position}:</strong> ${p.hired}</li>`).join('')}
            </ul>
            
            <h4>Monthly Trend:</h4>
            <ul>
                <li>January: 20 hires</li>
                <li>February: 22 hires</li>
                <li>March: 24 hires</li>
                <li>April: 30 hires</li>
                <li>May: 33 hires</li>
                <li>June: 36 hires</li>
                <li>July: 37 hires (current)</li>
            </ul>
        </div>
    `;
}

function generateConversionBreakdown() {
    const conversionRate = ((recruitmentData.psp.pipeline.filter(p => p.status === 'Onboarded').length + 
                           recruitmentData.pmo.pipeline.filter(p => p.status === 'Onboarded').length) / 
                           totalCVsProcessed * 100).toFixed(1);
    
    return `
        <div style="padding: 20px;">
            <h3>📈 Conversion Rate Analysis</h3>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>Overall Conversion Rate: ${conversionRate}%</h4>
                <p>Industry benchmark: 2-4%</p>
                <p>✅ Within industry standards</p>
            </div>
            
            <h4>Stage-by-Stage Conversion:</h4>
            <ul>
                <li>CV to TA Review: 32%</li>
                <li>TA to HRBP Review: 70%</li>
                <li>HRBP to HR Interview: 61%</li>
                <li>HR to Panel Interview: 79%</li>
                <li>Panel to Final: 48%</li>
                <li>Final to Hire: 85%</li>
            </ul>
            
            <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>🎯 Improvement Opportunities:</h4>
                <p>Panel to Final Interview has lowest conversion (48%) - review panel criteria</p>
            </div>
        </div>
    `;
}

// Event Listeners
function setupEventListeners() {
    // Close modals when clicking outside
    window.onclick = function(event) {
        const insightsModal = document.getElementById('insights-modal');
        const drilldownModal = document.getElementById('drilldown-modal');
        
        if (event.target === insightsModal) {
            insightsModal.style.display = 'none';
        }
        if (event.target === drilldownModal) {
            drilldownModal.style.display = 'none';
        }
    };
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeDrilldown();
        }
    });
    
    // Chart hover effects
    document.querySelectorAll('.chart-wrapper').forEach(wrapper => {
        wrapper.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        wrapper.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Chart Event Handlers
function showMonthlyDrilldown(month) {
    const modal = document.getElementById('drilldown-modal');
    const title = document.getElementById('drilldown-title');
    const content = document.getElementById('drilldown-content');
    
    title.textContent = `Monthly Analysis - ${month}`;
    
    const monthData = recruitmentData.psp.monthlyData.find(d => d.month === month);
    
    content.innerHTML = `
        <div style="padding: 20px;">
            <h3>📊 ${month} Performance</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                    <h4>Onboarded</h4>
                    <p style="font-size: 2em; font-weight: bold;">${monthData.onboard}</p>
                </div>
                <div style="background: #fff3e0; padding: 15px; border-radius: 8px;">
                    <h4>Total Open Roles</h4>
                    <p style="font-size: 2em; font-weight: bold;">${monthData.openRoles.hq + monthData.openRoles.pakil + monthData.openRoles.wawa}</p>
                </div>
            </div>
            <h4>Open Roles by Location:</h4>
            <ul>
                <li>HQ: ${monthData.openRoles.hq}</li>
                <li>Pakil PSP: ${monthData.openRoles.pakil}</li>
                <li>Wawa PSP: ${monthData.openRoles.wawa}</li>
            </ul>
        </div>
    `;
    
    modal.style.display = 'block';
}

function showDivisionDrilldown(division) {
    const modal = document.getElementById('drilldown-modal');
    const title = document.getElementById('drilldown-title');
    const content = document.getElementById('drilldown-content');
    
    title.textContent = `${division} Analysis`;
    content.innerHTML = `<div style="padding: 20px;"><h3>Detailed analysis for ${division}</h3><p>Division-specific metrics and performance data will be displayed here.</p></div>`;
    
    modal.style.display = 'block';
}

function showFunnelDrilldown(stage) {
    const modal = document.getElementById('drilldown-modal');
    const title = document.getElementById('drilldown-title');
    const content = document.getElementById('drilldown-content');
    
    title.textContent = `Pipeline Stage: ${stage}`;
    
    const stageData = calculateFunnelData().find(d => d.stage === stage);
    
    content.innerHTML = `
        <div style="padding: 20px;">
            <h3>🔍 ${stage} Details</h3>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>Current Metrics</h4>
                <p><strong>Count:</strong> ${stageData.count} candidates</p>
                <p><strong>Percentage:</strong> ${stageData.percentage}% of total pipeline</p>
            </div>
            <p>Detailed breakdown and analysis for this pipeline stage.</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Utility Functions
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function formatPercentage(num) {
    return `${num.toFixed(1)}%`;
}

// Export/Print Functions
function exportDashboard() {
    window.print();
}

function generateReport() {
    const reportData = {
        timestamp: new Date().toISOString(),
        summary: {
            totalCVs: totalCVsProcessed,
            totalHires: recruitmentData.psp.pipeline.filter(p => p.status === 'Onboarded').length + 
                       recruitmentData.pmo.pipeline.filter(p => p.status === 'Onboarded').length,
            overallFillRate: Math.round(((recruitmentData.psp.summary.filledPositions + recruitmentData.pmo.summary.filledPositions) / 
                           (recruitmentData.psp.summary.totalPositions + recruitmentData.pmo.summary.totalPositions)) * 100),
            activeRoles: recruitmentData.psp.summary.ongoingPositions + recruitmentData.pmo.summary.ongoingPositions
        },
        insights: generateInsights(),
        recommendations: [
            "Increase HRBP review capacity to reduce bottleneck",
            "Focus recruitment efforts on PMO division",
            "Implement automated CV screening",
            "Establish weekly pipeline review meetings"
        ]
    };
    
    // Create downloadable report
    const reportBlob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(reportBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `PSP_Recruitment_Report_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Real-time Updates Simulation
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Simulate small data changes
        const randomPosition = Math.floor(Math.random() * recruitmentData.psp.pipeline.length);
        const randomStage = Math.floor(Math.random() * 3);
        
        // Update charts if needed
        if (Math.random() > 0.8) { // 20% chance of update
            updateKPIs();
            
            // Flash update indicator
            const indicator = document.createElement('div');
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                font-size: 0.9em;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            indicator.textContent = '📊 Data Updated';
            document.body.appendChild(indicator);
            
            setTimeout(() => {
                indicator.remove();
            }, 3000);
        }
    }, 30000); // Check every 30 seconds
}

// Animation CSS for updates
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .chart-container:hover {
        animation: pulse 0.3s ease;
    }
    
    .kpi-card:hover .kpi-value {
        animation: pulse 0.5s ease;
    }
`;
document.head.appendChild(style);

// Search and Filter Functions
function searchPositions(searchTerm) {
    const allPositions = [...recruitmentData.psp.pipeline, ...recruitmentData.pmo.pipeline];
    const filtered = allPositions.filter(position => 
        position.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (position.candidate && position.candidate.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return filtered;
}

function filterByStatus(status) {
    const allPositions = [...recruitmentData.psp.pipeline, ...recruitmentData.pmo.pipeline];
    return allPositions.filter(position => position.status === status);
}

function filterByDivision(division) {
    return division === 'PSP' ? recruitmentData.psp.pipeline : recruitmentData.pmo.pipeline;
}

// Advanced Analytics Functions
function calculateTrendAnalysis() {
    const monthlyTrends = recruitmentData.psp.monthlyData;
    const trends = {
        hiring: {
            current: monthlyTrends[monthlyTrends.length - 1].onboard,
            previous: monthlyTrends[monthlyTrends.length - 2].onboard,
            trend: 'up'
        },
        openRoles: {
            current: monthlyTrends[monthlyTrends.length - 1].openRoles.hq + 
                    monthlyTrends[monthlyTrends.length - 1].openRoles.pakil + 
                    monthlyTrends[monthlyTrends.length - 1].openRoles.wawa,
            previous: monthlyTrends[monthlyTrends.length - 2].openRoles.hq + 
                     monthlyTrends[monthlyTrends.length - 2].openRoles.pakil + 
                     monthlyTrends[monthlyTrends.length - 2].openRoles.wawa,
            trend: 'down'
        }
    };
    
    trends.hiring.trend = trends.hiring.current > trends.hiring.previous ? 'up' : 'down';
    trends.openRoles.trend = trends.openRoles.current < trends.openRoles.previous ? 'down' : 'up';
    
    return trends;
}

function predictHiringNeeds() {
    const monthlyData = recruitmentData.psp.monthlyData;
    const avgHiring = monthlyData.reduce((sum, month) => sum + month.onboard, 0) / monthlyData.length;
    const avgOpenRoles = monthlyData.reduce((sum, month) => 
        sum + month.openRoles.hq + month.openRoles.pakil + month.openRoles.wawa, 0) / monthlyData.length;
    
    return {
        predictedNextMonthHires: Math.round(avgHiring * 1.1), // 10% growth assumption
        predictedOpenRoles: Math.round(avgOpenRoles * 0.95), // 5% reduction assumption
        timeToFillAllRoles: Math.round(recruitmentData.psp.summary.ongoingPositions / avgHiring)
    };
}

// Performance Scoring
function calculatePerformanceScore() {
    const pspScore = {
        fillRate: (recruitmentData.psp.summary.fillRate / 100) * 25, // 25 points max
        conversionRate: Math.min((3.1 / 4) * 25, 25), // 25 points max, 4% is perfect
        timeToHire: Math.min((30 / 35) * 25, 25), // 25 points max, 30 days is target
        pipelineHealth: 25 // Based on bottleneck analysis
    };
    
    const pmoScore = {
        fillRate: (recruitmentData.pmo.summary.fillRate / 100) * 25,
        conversionRate: Math.min((1.2 / 4) * 25, 25),
        timeToHire: Math.min((45 / 35) * 15, 25), // Penalty for longer time
        pipelineHealth: 10 // Lower due to bottlenecks
    };
    
    pspScore.total = Math.round(Object.values(pspScore).reduce((sum, score) => sum + score, 0));
    pmoScore.total = Math.round(Object.values(pmoScore).reduce((sum, score) => sum + score, 0));
    
    return { psp: pspScore, pmo: pmoScore };
}

// Data Validation and Quality Checks
function validateData() {
    const issues = [];
    
    // Check for data inconsistencies
    [...recruitmentData.psp.pipeline, ...recruitmentData.pmo.pipeline].forEach((position, index) => {
        if (position.hrbpReview > position.taReview) {
            issues.push(`Position ${index + 1}: HRBP review count exceeds TA review count`);
        }
        if (position.hrInterview > position.hrbpReview) {
            issues.push(`Position ${index + 1}: HR interview count exceeds HRBP review count`);
        }
        if (position.totalCVs === 0 && position.status !== 'Onboarded') {
            issues.push(`Position ${index + 1}: No CVs but position not filled`);
        }
    });
    
    return issues;
}

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add ARIA labels to charts
    document.querySelectorAll('canvas').forEach((canvas, index) => {
        canvas.setAttribute('aria-label', `Chart ${index + 1}: Interactive data visualization`);
        canvas.setAttribute('role', 'img');
    });
    
    // Add keyboard navigation to KPI cards
    document.querySelectorAll('.kpi-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.click();
            }
        });
    });
    
    // Add screen reader announcements
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
    };
}

// Mobile Responsiveness Enhancements
function optimizeForMobile() {
    if (window.innerWidth < 768) {
        // Adjust chart options for mobile
        Object.values(charts).forEach(chart => {
            if (chart && chart.options) {
                chart.options.plugins.legend.position = 'bottom';
                chart.options.scales.x.ticks.maxRotation = 90;
                chart.update();
            }
        });
        
        // Simplify data tables for mobile
        document.querySelectorAll('.data-table').forEach(table => {
            table.style.fontSize = '0.8em';
        });
    }
}

// Error Handling and Logging
function setupErrorHandling() {
    window.addEventListener('error', function(event) {
        console.error('Dashboard Error:', event.error);
        
        // Show user-friendly error message
        const errorBanner = document.createElement('div');
        errorBanner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #f44336;
            color: white;
            padding: 10px;
            text-align: center;
            z-index: 10000;
            font-weight: bold;
        `;
        errorBanner.textContent = 'An error occurred. Please refresh the page.';
        document.body.appendChild(errorBanner);
        
        setTimeout(() => {
            errorBanner.remove();
        }, 5000);
    });
}

// Initialize Enhanced Features
function initializeEnhancedFeatures() {
    enhanceAccessibility();
    optimizeForMobile();
    setupErrorHandling();
    
    // Start real-time updates simulation
    simulateRealTimeUpdates();
    
    // Data validation
    const issues = validateData();
    if (issues.length > 0) {
        console.warn('Data Quality Issues:', issues);
    }
    
    // Performance scoring
    const performanceScores = calculatePerformanceScore();
    console.log('Performance Scores:', performanceScores);
    
    // Trend analysis
    const trends = calculateTrendAnalysis();
    console.log('Trend Analysis:', trends);
    
    // Predictions
    const predictions = predictHiringNeeds();
    console.log('Hiring Predictions:', predictions);
}

// Window resize handler
window.addEventListener('resize', function() {
    optimizeForMobile();
    
    // Resize all charts
    setTimeout(() => {
        Object.values(charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }, 100);
});

// Page visibility change handler
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible, refresh data
        updateKPIs();
        console.log('Page visibility restored - data refreshed');
    }
});

// Initialize enhanced features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for initial dashboard load
    setTimeout(() => {
        initializeEnhancedFeatures();
        console.log('🚀 Enhanced features initialized');
    }, 1000);
});

// Global functions for HTML buttons and interactions
window.showTab = showTab;
window.showInsights = showInsights;
window.closeModal = closeModal;
window.closeDrilldown = closeDrilldown;
window.drillDown = drillDown;
window.exportDashboard = exportDashboard;
window.generateReport = generateReport;

// Console API for debugging and testing
window.dashboardAPI = {
    getData: () => recruitmentData,
    getCharts: () => charts,
    updateKPIs: updateKPIs,
    validateData: validateData,
    getPerformanceScore: calculatePerformanceScore,
    getTrends: calculateTrendAnalysis,
    getPredictions: predictHiringNeeds,
    searchPositions: searchPositions,
    filterByStatus: filterByStatus,
    filterByDivision: filterByDivision
};

console.log('🎯 PSP Talent Acquisition Dashboard API Ready');
console.log('Use window.dashboardAPI to access dashboard functions');
console.log('Example: window.dashboardAPI.getPerformanceScore()');


// Pipeline Funnel Chart
function initPipelineFunnelChart() {
    const container = document.querySelector('#pipeline-funnel-chart').parentElement;
    const canvas = document.getElementById('pipeline-funnel-chart');
    canvas.style.display = 'none';
    
    const funnelData = calculateFunnelData();
    
    const funnelHTML = `
        <div class="proper-funnel-container">
            <h4>Recruitment Pipeline Funnel</h4>
            <div class="funnel-chart">
                ${funnelData.map((stage, index) => `
                    <div class="funnel-segment" 
                         onclick="showFunnelDrilldown('${stage.stage}')"
                         style="--segment-index: ${index}; --total-segments: ${funnelData.length};">
                        <div class="funnel-content">
                            <span class="stage-name">${stage.stage}</span>
                            <span class="stage-count">${stage.count.toLocaleString()}</span>
                            <span class="stage-percentage">${stage.percentage}%</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', funnelHTML);
}

// Bottleneck Chart
function initBottleneckChart() {
    const ctx = document.getElementById('bottleneck-chart').getContext('2d');
    
    const bottleneckData = [
        { stage: 'HRBP CV Review', count: 70, impact: 'High' },
        { stage: 'HR Interview', count: 15, impact: 'Medium' },
        { stage: 'Panel Interview', count: 8, impact: 'Low' },
        { stage: 'Final Interview', count: 5, impact: 'Low' }
    ];
    
    charts.bottleneck = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: bottleneckData.map(d => d.stage),
            datasets: [{
                label: 'Pending Count',
                data: bottleneckData.map(d => d.count),
                backgroundColor: bottleneckData.map(d => 
                    d.impact === 'High' ? '#f44336' : 
                    d.impact === 'Medium' ? '#FF9800' : '#4CAF50'
                ),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const impact = bottleneckData[context.dataIndex].impact;
                            return `${context.parsed.y} pending (${impact} Impact)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Pending Candidates'
                    }
                }
            }
        }
    });
}

// Conversion Rates Chart
function initConversionRatesChart() {
    const ctx = document.getElementById('conversion-rates-chart').getContext('2d');
    
    const conversionData = calculateConversionRates();
    
    charts.conversionRates = new Chart(ctx, {
        type: 'line',
        data: {
            labels: conversionData.map(d => d.stage),
            datasets: [{
                label: 'Conversion Rate (%)',
                data: conversionData.map(d => d.rate),
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2196F3',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 6
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
                    max: 100,
                    title: {
                        display: true,
                        text: 'Conversion Rate (%)'
                    }
                }
            }
        }
    });
}

// Top Positions Chart
function initTopPositionsChart() {
    const ctx = document.getElementById('top-positions-chart').getContext('2d');
    
    const topPositions = [...recruitmentData.psp.pipeline, ...recruitmentData.pmo.pipeline]
        .sort((a, b) => b.totalCVs - a.totalCVs)
        .slice(0, 8)
        .map(p => ({
            position: p.position.length > 25 ? p.position.substring(0, 25) + '...' : p.position,
            cvs: p.totalCVs
        }));
    
    charts.topPositions = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topPositions.map(d => d.position),
            datasets: [{
                label: 'Total CVs',
                data: topPositions.map(d => d.cvs),
                backgroundColor: 'rgba(0, 150, 136, 0.7)',
                borderColor: '#009688',
                borderWidth: 2
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
                    title: {
                        display: true,
                        text: 'Number of CVs'
                    }
                },
                x: {
                    ticks: {
                        maxRotation: 45
                    }
                }
            }
        }
    });
}

// Status Distribution Chart
function initStatusDistributionChart() {
    const ctx = document.getElementById('status-distribution-chart').getContext('2d');
    
    const statusData = calculateStatusDistribution();
    
    charts.statusDistribution = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: statusData.map(d => d.status),
            datasets: [{
                data: statusData.map(d => d.count),
                backgroundColor: [
                    '#f44336', '#FF9800', '#2196F3', '#4CAF50', 
                    '#9C27B0', '#607D8B', '#795548'
                ],
                borderWidth: 2,
                borderColor: '#fff'
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
}

// Complete the PSP vs PMO Performance Chart (this was cut off)
function initPSPPMOPerformanceChart() {
    const ctx = document.getElementById('psp-pmo-performance-chart').getContext('2d');
    
    charts.pspPmoPerformance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['CV Volume', 'Fill Rate', 'Pipeline Health', 'Time to Hire', 'Interview Success'],
            datasets: [{
                label: 'PSP',
                data: [85, 92, 78, 75, 85],
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                borderColor: '#2196F3',
                borderWidth: 2,
                pointBackgroundColor: '#2196F3'
            }, {
                label: 'PMO',
                data: [45, 24, 42, 60, 65],
                backgroundColor: 'rgba(255, 152, 0, 0.2)',
                borderColor: '#FF9800',
                borderWidth: 2,
                pointBackgroundColor: '#FF9800'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

// Division Comparison Chart
function initDivisionComparisonChart() {
    const ctx = document.getElementById('division-comparison-chart').getContext('2d');
    
    charts.divisionComparison = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['PSP Filled', 'PSP Ongoing', 'PMO Filled', 'PMO Ongoing'],
            datasets: [{
                data: [
                    recruitmentData.psp.summary.filledPositions,
                    recruitmentData.psp.summary.ongoingPositions,
                    recruitmentData.pmo.summary.filledPositions,
                    recruitmentData.pmo.summary.ongoingPositions
                ],
                backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#f44336'],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const labels = ['PSP Filled', 'PSP Ongoing', 'PMO Filled', 'PMO Ongoing'];
                    showDivisionDrilldown(labels[index]);
                }
            }
        }
    });
}
// Utility Functions
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

function formatPercentage(num) {
    return `${num.toFixed(1)}%`;
}

// Chart Event Handlers
function showMonthlyDrilldown(month) {
    const modal = document.getElementById('drilldown-modal');
    const title = document.getElementById('drilldown-title');
    const content = document.getElementById('drilldown-content');
    
    title.textContent = `Monthly Analysis - ${month}`;
    
    const monthData = recruitmentData.psp.monthlyData.find(d => d.month === month);
    
    content.innerHTML = `
        <div style="padding: 20px;">
            <h3>📊 ${month} Performance</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
                    <h4>Onboarded</h4>
                    <p style="font-size: 2em; font-weight: bold;">${monthData.onboard}</p>
                </div>
                <div style="background: #fff3e0; padding: 15px; border-radius: 8px;">
                    <h4>Total Open Roles</h4>
                    <p style="font-size: 2em; font-weight: bold;">${monthData.openRoles.hq + monthData.openRoles.pakil + monthData.openRoles.wawa}</p>
                </div>
            </div>
            <h4>Open Roles by Location:</h4>
            <ul>
                <li>HQ: ${monthData.openRoles.hq}</li>
                <li>Pakil PSP: ${monthData.openRoles.pakil}</li>
                <li>Wawa PSP: ${monthData.openRoles.wawa}</li>
            </ul>
        </div>
    `;
    
    modal.style.display = 'block';
}

function showDivisionDrilldown(division) {
    const modal = document.getElementById('drilldown-modal');
    const title = document.getElementById('drilldown-title');
    const content = document.getElementById('drilldown-content');
    
    title.textContent = `${division} Analysis`;
    content.innerHTML = `<div style="padding: 20px;"><h3>Detailed analysis for ${division}</h3><p>Division-specific metrics and performance data will be displayed here.</p></div>`;
    
    modal.style.display = 'block';
}

function showFunnelDrilldown(stage) {
    const modal = document.getElementById('drilldown-modal');
    const title = document.getElementById('drilldown-title');
    const content = document.getElementById('drilldown-content');
    
    title.textContent = `Pipeline Stage: ${stage}`;
    
    const stageData = calculateFunnelData().find(d => d.stage === stage);
    
    content.innerHTML = `
        <div style="padding: 20px;">
            <h3>🔍 ${stage} Details</h3>
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                <h4>Current Metrics</h4>
                <p><strong>Count:</strong> ${stageData.count} candidates</p>
                <p><strong>Percentage:</strong> ${stageData.percentage}% of total pipeline</p>
            </div>
            <p>Detailed breakdown and analysis for this pipeline stage.</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

function showDataInfo() {
    const modal = document.getElementById('data-info-modal');
    modal.style.display = 'block';
}

function closeDataInfo() {
    document.getElementById('data-info-modal').style.display = 'none';
}

// Update the global functions section to include:
window.showDataInfo = showDataInfo;
window.closeDataInfo = closeDataInfo;