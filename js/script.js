document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const icon = mobileNavToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // Class Insights Accordion
    const classHeaders = document.querySelectorAll('.class-header');
    
    classHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const classItem = this.parentElement;
            classItem.classList.toggle('active');
            
            // Load content if it's "Loading content..."
            const contentDiv = classItem.querySelector('.class-content');
            if (contentDiv.innerHTML.trim() === '<p>Loading content...</p>') {
                const classNumber = header.querySelector('h3').textContent.match(/Class (\d+)/)[1];
                loadClassContent(classNumber, contentDiv);
            }
        });
    });
    
    // Expand/Collapse All Buttons
    const expandAllBtn = document.getElementById('expandAll');
    const collapseAllBtn = document.getElementById('collapseAll');
    
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function() {
            const classItems = document.querySelectorAll('.class-item');
            classItems.forEach(item => {
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                    
                    // Load content if needed
                    const contentDiv = item.querySelector('.class-content');
                    if (contentDiv.innerHTML.trim() === '<p>Loading content...</p>') {
                        const classNumber = item.querySelector('h3').textContent.match(/Class (\d+)/)[1];
                        loadClassContent(classNumber, contentDiv);
                    }
                }
            });
        });
    }
    
    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function() {
            const classItems = document.querySelectorAll('.class-item');
            classItems.forEach(item => {
                item.classList.remove('active');
            });
        });
    }
    
    // Resources Section Toggles
    const resourceClassHeaders = document.querySelectorAll('.resource-class h3');
    
    resourceClassHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const resourceClass = this.parentElement;
            resourceClass.classList.toggle('collapsed');
            
            // Load resource content if it's placeholder text
            const gridDiv = resourceClass.querySelector('.resource-grid');
            if (gridDiv.innerHTML.trim() === '<p>Click to expand resources</p>') {
                const classNumber = header.textContent.match(/Class (\d+)/)[1];
                loadResourceContent(classNumber, gridDiv);
            }
        });
    });
    
    // Search Functionality
    const searchInput = document.getElementById('insightSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const classItems = document.querySelectorAll('.class-item');
            
            if (searchTerm.length < 3) {
                // Reset visibility if search term is too short
                classItems.forEach(item => {
                    item.style.display = 'block';
                });
                return;
            }
            
            // Expand all items to search through content
            classItems.forEach(item => {
                if (!item.classList.contains('active')) {
                    item.classList.add('active');
                    
                    // Load content if needed
                    const contentDiv = item.querySelector('.class-content');
                    if (contentDiv.innerHTML.trim() === '<p>Loading content...</p>') {
                        const classNumber = item.querySelector('h3').textContent.match(/Class (\d+)/)[1];
                        loadClassContent(classNumber, contentDiv);
                    }
                }
                
                // Check if content contains search term
                const content = item.textContent.toLowerCase();
                if (content.includes(searchTerm)) {
                    item.style.display = 'block';
                    
                    // Highlight matching text
                    highlightText(item, searchTerm);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            const messageDiv = document.querySelector('.subscription-message');
            
            // Simple email validation
            if (email && email.includes('@') && email.includes('.')) {
                messageDiv.textContent = 'Thanks for joining! You\'ve been subscribed to our newsletter.';
                messageDiv.style.color = '#2ecc71';
                emailInput.value = '';
            } else {
                messageDiv.textContent = 'Please enter a valid email address.';
                messageDiv.style.color = '#e74c3c';
            }
        });
    }
    
    // Modal for "Learn More About This Project"
    const learnMoreLink = document.querySelector('.learn-more');
    
    if (learnMoreLink) {
        learnMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>About This Project</h2>
                    <p>This website was created as part of a Competitive Intelligence course at HSE University. It represents a compilation of insights, resources, and learning materials gathered throughout the course.</p>
                    <p>The content reflects personal insights and understanding developed during the course, with guidance from Prof. Jonathan Calof and Oksana Bonarenko.</p>
                    <p>The website serves as both a learning tool and a resource hub for those interested in Competitive Intelligence concepts and methodologies.</p>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add styles for modal
            const style = document.createElement('style');
            style.textContent = `
                .modal {
                    display: block;
                    position: fixed;
                    z-index: 1001;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.7);
                }
                .modal-content {
                    background-color: white;
                    margin: 15% auto;
                    padding: 30px;
                    border-radius: 8px;
                    width: 80%;
                    max-width: 600px;
                    position: relative;
                }
                .close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 28px;
                    font-weight: bold;
                    cursor: pointer;
                }
            `;
            document.head.appendChild(style);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close when clicking outside modal content
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    }
    
    // Download All button for Class 1
    const class1AllBtn = document.getElementById('class1-all');
    
    if (class1AllBtn) {
        class1AllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a list of all Class 1 resources
            const resources = [
                'Class 1 PowerPoints.pdf',
                'Seena Sharp 10 myths that cripple competitive intelligence.pdf',
                'Maduerira CI unified definition.pdf',
                'Important functions of competitive intelligence.pdf',
                'DuToit_Competitive_2015 from program.pdf',
                'CIQ_questionnaire_calof.pdf',
                'Calof past projects.pdf'
            ];
            
            // Create a modal with links to all resources
            const modal = document.createElement('div');
            modal.className = 'modal';
            
            let linksHTML = '';
            resources.forEach(resource => {
                linksHTML += `<p><a href="resources/class1/${resource}" download>${resource}</a></p>`;
            });
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Class 1 Resources</h2>
                    <p>Click on each link to download:</p>
                    ${linksHTML}
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add styles for modal if not already added
            if (!document.querySelector('style[data-modal="true"]')) {
                const style = document.createElement('style');
                style.setAttribute('data-modal', 'true');
                style.textContent = `
                    .modal {
                        display: block;
                        position: fixed;
                        z-index: 1001;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0,0,0,0.7);
                    }
                    .modal-content {
                        background-color: white;
                        margin: 15% auto;
                        padding: 30px;
                        border-radius: 8px;
                        width: 80%;
                        max-width: 600px;
                        position: relative;
                    }
                    .close {
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        font-size: 28px;
                        font-weight: bold;
                        cursor: pointer;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close when clicking outside modal content
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    }
    
    // Helper Functions
    
    // Load class content from markdown files
    function loadClassContent(classNumber, contentDiv) {
        fetch(`insights/class${classNumber}/content.md`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                // Simple markdown to HTML conversion for demonstration
                const html = convertMarkdownToHTML(markdown);
                contentDiv.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading content:', error);
                contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
            });
    }
    
    // Load resource content
    function loadResourceContent(classNumber, gridDiv) {
        // Clear the grid
        gridDiv.innerHTML = '<p>Loading resources...</p>';
        
        // Fetch the file list JSON for this class
        fetch(`resources/class${classNumber}/file_list.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('File list not found');
                }
                return response.json();
            })
            .then(files => {
                // Clear the grid
                gridDiv.innerHTML = '';
                
                // Display resources
                if (files.length === 0) {
                    gridDiv.innerHTML = '<p>No resources available for this class yet.</p>';
                    return;
                }
                
                // Create resource cards
                files.forEach(file => {
                    const card = document.createElement('div');
                    card.className = 'resource-card';
                    
                    // Determine icon based on file extension
                    let fileIcon = 'fa-file-pdf';
                    if (file.path.endsWith('.zip') || file.path.endsWith('.rar')) {
                        fileIcon = 'fa-file-archive';
                    } else if (file.path.endsWith('.doc') || file.path.endsWith('.docx')) {
                        fileIcon = 'fa-file-word';
                    } else if (file.path.endsWith('.ppt') || file.path.endsWith('.pptx')) {
                        fileIcon = 'fa-file-powerpoint';
                    }
                    
                    // Create the download link with proper path
                    const downloadLink = document.createElement('a');
                    downloadLink.href = `${file.path}`;
                    downloadLink.className = 'download-btn';
                    downloadLink.target = '_blank'; // Open in new tab
                    downloadLink.rel = 'noopener noreferrer'; // Security best practice
                    
                    card.innerHTML = `
                        <div class="resource-icon">
                            <i class="fas ${fileIcon}"></i>
                        </div>
                        <h4>${file.title}</h4>
                        <p>${file.description}</p>
                        <p class="file-meta">${file.meta}</p>
                    `;
                    
                    // Add the download link to the card
                    card.appendChild(downloadLink);
                    downloadLink.textContent = 'Download';
                    
                    gridDiv.appendChild(card);
                });
                
                // Add "Download All" card
                const downloadAllCard = document.createElement('div');
                downloadAllCard.className = 'resource-card';
                downloadAllCard.innerHTML = `
                    <div class="resource-icon">
                        <i class="fas fa-download"></i>
                    </div>
                    <h4>All Class ${classNumber} Resources</h4>
                    <p>Complete set of resources for Class ${classNumber}</p>
                    <p class="file-meta">Multiple Files</p>
                    <a href="#" class="download-btn" id="class${classNumber}-all">Download All</a>
                `;
                gridDiv.appendChild(downloadAllCard);
                
                // Add event listener for the "Download All" button
                const downloadAllBtn = document.getElementById(`class${classNumber}-all`);
                if (downloadAllBtn) {
                    downloadAllBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Create a modal with links to all resources
                        const modal = document.createElement('div');
                        modal.className = 'modal';
                        
                        let linksHTML = '';
                        files.forEach(file => {
                            linksHTML += `<p><a href="resources/class${classNumber}/${file.path}" target="_blank" rel="noopener noreferrer">${file.title}</a></p>`;
                        });
                        
                        modal.innerHTML = `
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <h2>Class ${classNumber} Resources</h2>
                                <p>Click on each link to open the file in a new tab:</p>
                                ${linksHTML}
                            </div>
                        `;
                        
                        document.body.appendChild(modal);
                        
                        // Add styles for modal if not already added
                        if (!document.querySelector('style[data-modal="true"]')) {
                            const style = document.createElement('style');
                            style.setAttribute('data-modal', 'true');
                            style.textContent = `
                                .modal {
                                    display: block;
                                    position: fixed;
                                    z-index: 1001;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    background-color: rgba(0,0,0,0.7);
                                }
                                .modal-content {
                                    background-color: white;
                                    margin: 15% auto;
                                    padding: 30px;
                                    border-radius: 8px;
                                    width: 80%;
                                    max-width: 600px;
                                    position: relative;
                                    max-height: 70vh;
                                    overflow-y: auto;
                                }
                                .close {
                                    position: absolute;
                                    top: 15px;
                                    right: 20px;
                                    font-size: 28px;
                                    font-weight: bold;
                                    cursor: pointer;
                                }
                            `;
                            document.head.appendChild(style);
                        }
                        
                        // Close modal functionality
                        const closeBtn = modal.querySelector('.close');
                        closeBtn.addEventListener('click', function() {
                            document.body.removeChild(modal);
                        });
                        
                        // Close when clicking outside modal content
                        window.addEventListener('click', function(event) {
                            if (event.target === modal) {
                                document.body.removeChild(modal);
                            }
                        });
                    });
                }
            })
            .catch(error => {
                console.error('Error loading resources:', error);
                // If fetching the file_list.json fails, fall back to the existing functionality
                const classResources = {
                    1: [
                        {
                            title: "Class 1 PowerPoints",
                            description: "Introduction to CI basics and fundamentals",
                            fileMeta: "PDF, 1.4MB",
                            fileUrl: "resources/class1/Class 1 PowerPoints.pdf"
                        },
                        {
                            title: "Seena Sharp: 10 Myths of CI",
                            description: "Overview of common misconceptions about CI",
                            fileMeta: "PDF, 87KB",
                            fileUrl: "resources/class1/Seena Sharp 10 myths that cripple competitive intelligence.pdf"
                        },
                        {
                            title: "Maduerira CI Unified Definition",
                            description: "Comprehensive framework for understanding CI",
                            fileMeta: "PDF, 3.5MB",
                            fileUrl: "resources/class1/Maduerira CI unified definition.pdf"
                        },
                        {
                            title: "Important Functions of CI",
                            description: "Key functions and applications of CI",
                            fileMeta: "PDF, 157KB",
                            fileUrl: "resources/class1/Important functions of competitive intelligence.pdf"
                        },
                        {
                            title: "Du Toit: Competitive Intelligence",
                            description: "Academic perspective on CI theory and practice",
                            fileMeta: "PDF, 272KB",
                            fileUrl: "resources/class1/DuToit_Competitive_2015 from program.pdf"
                        },
                        {
                            title: "CI Questionnaire",
                            description: "Assessment tool for CI practices",
                            fileMeta: "PDF, 261KB",
                            fileUrl: "resources/class1/CIQ_questionnaire_calof.pdf"
                        }
                    ],
                    // Other classes would go here...
                };
                
                // Get resources for this class
                const resources = classResources[classNumber] || [];
                
                // Clear the grid
                gridDiv.innerHTML = '';
                
                // Display resources
                if (resources.length === 0) {
                    gridDiv.innerHTML = '<p>No resources available for this class yet.</p>';
                } else {
                    // Create resource cards
                    resources.forEach(resource => {
                        const card = document.createElement('div');
                        card.className = 'resource-card';
                        card.innerHTML = `
                            <div class="resource-icon">
                                <i class="fas fa-file-pdf"></i>
                            </div>
                            <h4>${resource.title}</h4>
                            <p>${resource.description}</p>
                            <p class="file-meta">${resource.fileMeta}</p>
                            <a href="${resource.fileUrl}" class="download-btn">Download</a>
                        `;
                        gridDiv.appendChild(card);
                    });
                    
                    // Add "Download All" card
                    const downloadAllCard = document.createElement('div');
                    downloadAllCard.className = 'resource-card';
                    downloadAllCard.innerHTML = `
                        <div class="resource-icon">
                            <i class="fas fa-download"></i>
                        </div>
                        <h4>All Class ${classNumber} Resources</h4>
                        <p>Complete set of resources for Class ${classNumber}</p>
                        <p class="file-meta">Multiple Files</p>
                        <a href="#" class="download-btn" id="class${classNumber}-all">Download All</a>
                    `;
                    gridDiv.appendChild(downloadAllCard);
                    
                    // Add event listener for the "Download All" button
                    const downloadAllBtn = document.getElementById(`class${classNumber}-all`);
                    if (downloadAllBtn) {
                        downloadAllBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            alert(`Downloading all resources for Class ${classNumber}. This may take a moment...`);
                            
                            // In a real implementation, this would trigger a ZIP download
                            // For demo purposes, we'll just wait and show a message
                            setTimeout(() => {
                                alert(`All Class ${classNumber} resources downloaded successfully!`);
                            }, 2000);
                        });
                    }
                }
            });
    }
    
    // Simple markdown to HTML converter
    function convertMarkdownToHTML(markdown) {
        // This is a very basic converter for demonstration
        // Replace headers
        let html = markdown
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
            .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
            .replace(/^###### (.*$)/gm, '<h6>$1</h6>');
        
        // Replace bold and italic
        html = html
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\_\_(.*?)\_\_/g, '<strong>$1</strong>')
            .replace(/\_(.*?)\_/g, '<em>$1</em>');
        
        // Replace lists
        html = html
            .replace(/^\s*\-\s*(.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>');
        
        // Replace paragraphs (any line that doesn't start with a special character)
        html = html
            .replace(/^(?!<[h|u|l|p])(.*$)/gm, '<p>$1</p>')
            .replace(/<p><\/p>/g, ''); // Remove empty paragraphs
        
        return html;
    }
    
    // Highlight search matches
    function highlightText(element, searchTerm) {
        const paragraphs = element.querySelectorAll('p, li, h3, h4');
        
        paragraphs.forEach(paragraph => {
            const originalText = paragraph.innerHTML;
            const regex = new RegExp(searchTerm, 'gi');
            
            // Only highlight if there's a match
            if (originalText.toLowerCase().includes(searchTerm)) {
                const highlightedText = originalText.replace(regex, match => `<span class="highlight">${match}</span>`);
                paragraph.innerHTML = highlightedText;
            }
        });
        
        // Add highlight style if not already added
        if (!document.querySelector('style[data-highlight="true"]')) {
            const style = document.createElement('style');
            style.setAttribute('data-highlight', 'true');
            style.textContent = `
                .highlight {
                    background-color: #ffeb3b;
                    padding: 2px;
                    border-radius: 2px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize first class as active
    const firstClass = document.querySelector('.class-item');
    if (firstClass) {
        firstClass.classList.add('active');
    }
    
    // Initialize first resource class as not collapsed and load its content
    const firstResourceClass = document.querySelector('.resource-class');
    if (firstResourceClass) {
        firstResourceClass.classList.remove('collapsed');
        const gridDiv = firstResourceClass.querySelector('.resource-grid');
        if (gridDiv) {
            const classNumber = firstResourceClass.querySelector('h3').textContent.match(/Class (\d+)/)[1];
            loadResourceContent(classNumber, gridDiv);
        }
    }
});
