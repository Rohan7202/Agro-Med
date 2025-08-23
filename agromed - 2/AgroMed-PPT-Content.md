# Agro Med - PowerPoint (.pptx) Content Guide
*Professional Hackathon Presentation for Hack Odisha*

---

## Design Guidelines
**Color Scheme:** 
- Primary: Dark Green (#2D5016), Light Green (#4CAF50)
- Secondary: Earth Brown (#8D6E63), Cream (#FFF8E1)
- Accent: Orange (#FF9800), Blue (#2196F3)

**Fonts:** Use Calibri, Arial, or Segoe UI for best readability

---

## SLIDE 1: Title Slide
**Layout:** Title Slide
**Background:** Light green gradient or agricultural image

### Content:
**Title:** 🌱 Agro Med
**Subtitle:** Smart Crop Disease Detection
**Event:** 🏆 Hack Odisha Hackathon
**Team:** Rohan Kumar Sahoo • Subham Parida • Piyush Tiwari • Pousali Dolai • Sidhiprada Pradhan
**Date:** September 6-7, 2025

### Design Notes:
- Large, bold title with plant emoji
- Team names in smaller, professional font
- Add subtle agricultural background image if available

---

## SLIDE 2: Problem Statement  
**Layout:** Title and Content
**Icon:** 🚨

### Title: Problem Statement

### Bullet Points:
• 📈 Crop diseases cause 20-40% of global food loss annually
• ⏰ Manual detection is slow, labor-intensive, and often inaccurate
• 🌍 Existing solutions lack scalability and regional adaptation
• 🎯 **Solution:** An automated, AI-powered disease diagnosis system for farmers

### Design Notes:
- Use red/orange accents for problem points
- Green accent for solution point
- Include crop disease image if available

---

## SLIDE 3: Dataset Overview
**Layout:** Title and Content  
**Icon:** 📊

### Title: Dataset Overview

### Bullet Points:
• 📸 **Total images:** 13,324
• 🏷️ **Total classes:** 17 disease/healthy categories  
• 🌾 **Crops covered:** Corn, Potato, Rice, Wheat, Sugarcane
• 🔗 **Sources:** PlantVillage, Kaggle, regional agricultural datasets
• ✅ High-quality, labeled images for accurate ML training

### Design Notes:
- Use icons and bold numbers for key statistics
- Consider a small infographic showing the 5 crops

---

## SLIDE 4: Class Distribution
**Layout:** Title and Content with Table
**Icon:** 📈

### Title: Class Distribution

### Table:
| 🌾 Crop | 🦠 Disease Classes | 📸 Images |
|---------|-------------------|-----------|
| 🌽 Corn | Common Rust, Gray Leaf Spot, Healthy, Northern Leaf Blight | 3,852 |
| 🥔 Potato | Early Blight, Healthy, Late Blight | 2,152 |
| 🍚 Rice | Brown Spot, Healthy, Leaf Blast, Neck Blast | 4,078 |
| 🌾 Wheat | Brown Rust, Healthy, Yellow Rust | 2,942 |
| 🎍 Sugarcane | Red Rot, Healthy, Bacterial Blight | 300 |

### Note:
*Rice has the largest dataset with 4,078 images across 4 classes*

### Design Notes:
- Format as attractive table with alternating row colors
- Highlight the largest dataset (Rice) in green
- Consider a simple bar chart showing image distribution

---

## SLIDE 5: AI Model Architecture  
**Layout:** Title and Content
**Icon:** 🤖

### Title: AI Model Architecture

### Bullet Points:
• 🔧 **1. Data Preprocessing** - Image augmentation and normalization
• 🧠 **2. CNN Feature Extraction** - Convolutional Neural Network layers
• 🎯 **3. Multi-class Classification** - 17 disease categories with confidence scores
• 📊 **4. Training & Validation** - Cross-entropy loss with performance metrics
• 🚀 **5. API Deployment** - Real-time inference for mobile/web applications

### Design Notes:
- Use step numbers with different colors
- Add a simple flowchart: Input Image → CNN → Classification → Output
- Technical but accessible language

---

## SLIDE 6: System Workflow
**Layout:** Title and Content  
**Icon:** ⚡

### Title: System Workflow

### Bullet Points:
• 📱 **1. Image Upload** - Farmer captures crop leaf via web/mobile app
• ☁️ **2. Cloud Storage** - Image stored securely using Cloudinary
• 🧠 **3. AI Processing** - ML model analyzes image for disease detection
• 📋 **4. Results Delivery** - Prediction with confidence score sent to farmer
• 💡 **5. Recommendations** - Actionable treatment advice provided

### Workflow Diagrams Section:
**Insert your 5 workflow diagrams here:**
1. Overall system architecture (Frontend → Backend → ML)
2. Detailed backend flow with Supabase
3. API integration flow  
4. Team collaboration structure
5. Database and prediction flow

### Design Notes:
- Reserve space for your workflow diagrams
- Use arrows and flow elements
- Color-code different components (Frontend=Blue, Backend=Green, ML=Orange)

---

## SLIDE 7: Technology Stack
**Layout:** Title and Content (4 columns)
**Icon:** 🛠️

### Title: Technology Stack

### Four Sections:

#### 🎨 Frontend
- HTML5
- Tailwind CSS  
- JavaScript
- Responsive Design

#### ⚙️ Backend  
- Node.js
- Express.js
- PostgreSQL
- Cloudinary API

#### 🤖 Machine Learning
- CNN Model
- TensorFlow/PyTorch
- REST API
- Cloud Deployment

#### ☁️ Cloud & Storage
- Supabase
- Cloudinary
- PostgreSQL
- RESTful APIs

### Design Notes:
- Use 4-column layout with icons
- Different background color for each section
- Modern tech stack logos if available

---

## SLIDE 8: Team Structure & Roles
**Layout:** Title and Content
**Icon:** 👥

### Title: Team Structure & Roles

### Team Breakdown:

#### 🎨 Frontend Team
**Members:** Rohan, Pousali, Sidhiprada  
**Responsibility:** User interface, experience design, and farmer-friendly app development

#### ⚙️ Backend Team  
**Members:** Piyush, Subham
**Responsibility:** API development, database management, and system integration

#### 🤖 ML/AI Team
**Members:** Subham  
**Responsibility:** Model development, training, deployment, and performance optimization

### Team Diagram:
**Insert your team structure diagram here** - showing how Frontend, Backend, and ML teams collaborate

### Design Notes:
- Use team photos if available
- Color-code each team section
- Show interconnections between teams

---

## SLIDE 9: Challenges & Key Learnings
**Layout:** Title and Content
**Icon:** ⚠️

### Title: Challenges & Key Learnings

### Bullet Points:
• 📊 **Dataset Imbalance** - Sugarcane classes have only 300 images vs others with 1000+
• 🔄 **Data Source Diversity** - Affects model consistency and generalization  
• 🌍 **Regional Data Gap** - Need for more region-specific and field-condition data
• 🔗 **Integration Complexity** - Complex coordination between frontend, backend, and ML components
• ⚡ **Performance Optimization** - Real-time inference requirements for mobile deployment

### Design Notes:
- Use orange/yellow colors for challenges
- Balance technical and accessible language
- Show how team overcame challenges

---

## SLIDE 10: Future Scope & Roadmap  
**Layout:** Title and Content
**Icon:** 🚀

### Title: Future Scope & Roadmap

### Bullet Points:
• 📱 **Mobile App Development** - Offline diagnosis capability for remote areas
• 🌍 **Dataset Expansion** - Regional crop varieties and local disease patterns  
• 💡 **Smart Recommendations** - Treatment plans and farming best practices
• 🔗 **Supply Chain Integration** - Connect with agricultural experts and suppliers
• 📊 **Analytics Dashboard** - Track crop health trends and seasonal patterns
• 🤖 **Advanced AI Features** - Disease severity assessment and yield prediction

### Design Notes:
- Use green colors for positive future outlook
- Timeline or roadmap visual if space allows
- Emphasize scalability and impact

---

## SLIDE 11: Thank You & Q&A
**Layout:** Title Slide or Title and Content  
**Icon:** 🙏

### Title: Thank You!

### Content:
**🌱 Agro Med - Empowering Farmers with AI**

**Questions & Answers**

### Contact Information:
- GitHub: [Your GitHub link]
- Email: [Team contact email]  
- LinkedIn: [Team LinkedIn profiles]

### Design Notes:
- Use agricultural background image
- Large, friendly fonts
- Include team contact information
- Add QR code for project demo if available

---

## Additional Design Tips:

### Slide Transitions:
- Use "Fade" or "Push" transitions
- Keep timing consistent (0.5-1 second)

### Animations:
- Subtle entrance animations for bullet points
- "Fly In" or "Fade In" from left

### Images to Include:
- Crop disease examples from your dataset
- Your workflow diagrams (5 images)
- Team photos (optional)
- Agricultural background images
- Technology logos

### Presentation Tips:
- Practice timing: ~2-3 minutes per slide
- Prepare demo of your working system
- Have backup slides with technical details
- Print handouts with key statistics

---

*This content is optimized for a 10-12 minute hackathon presentation. Good luck at Hack Odisha! 🚀*