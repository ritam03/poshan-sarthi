# PoshanSarthi — Your AI Nutrition Charioteer 🌿🍛

**An AI Diet-Planning, Tracking & Food-Awareness Agent for the Indian Subcontinent**

![PoshanSarthi](https://via.placeholder.com/1200x400.png?text=PoshanSarthi+-+AI+Nutrition+Agent)

## 1. Executive Summary

PoshanSarthi is a first-of-its-kind AI nutrition agent purpose-built for the Indian subcontinent. It moves away from Western-centric "150g protein, 200g carbs" paradigms and embraces native food units—*thalis*, *rotis*, *katoris*. Designed **India-in, India-out**, it elegantly handles festival fasts (Navratri/Ramzan), tiffin services, hostel messes, and shared household kitchens. 

It unifies three core capabilities:
1. **Goal-based, cuisine-aware diet planning**
2. **Low-friction multi-modal tracking with adaptive replanning**
3. **Practical, conversational food awareness**

## 2. Product Vision & Design Principles
*“A nutrition companion that understands the Indian plate as well as it understands your goal — and changes course with you, not at you.”*

- 🌍 **Culturally Native by Default:** Regional cuisines, festival calendars, and vernacular language are core.
- 🧘 **Sustainable > Aggressive:** Prioritizes long-term consistency over crash dieting.
- ⚡ **Low-Friction Logging:** Photo, voice, text, and barcode logging (<10 seconds).
- 🔍 **Transparent Reasoning:** Agentic decisions are fully explainable.
- 👩‍⚕️ **Human Safety Net:** Escalates medical anomalies to a certified dietitian.
- 🔒 **Privacy First:** 100% DPDP Act (2023) compliant.

---

## 3. System Architecture & Diagrams

PoshanSarthi operates on an **Agentic, Multi-Agent Architecture**. This allows specialized reasoning modules (Diet Planning, Tracking, Food Awareness) to operate independently under a single Orchestrator, ensuring both high accuracy and maintainability.

### 3.1 High-Level Architecture (HLD)

The HLD maps how the client layer interacts with our AI core, which is backed by a robust RAG (Retrieval-Augmented Generation) pipeline over the Indian Food Knowledge Base.

```mermaid
flowchart TB
    subgraph CLIENT["Client Layer"]
        Mobile["Mobile App"]
        WA["WhatsApp Bot"]
        Voice["Voice Assistant"]
        Web["Web Dashboard (Demo)"]
    end

    GW["API Gateway / BFF (Auth & Rate Limiting)"]

    subgraph AGENTS["Agent Orchestration Layer"]
        Orch["Orchestrator Agent<br/>(Router + Context Memory)"]
        Diet["Diet Planning Agent"]
        Track["Tracking & Adaptation Agent"]
        Aware["Food Awareness Agent"]
    end

    subgraph AI["Foundation AI Services"]
        LLM["Reasoning LLM (Gemini 3.1 Pro)"]
        Vision["Food Image Recognition"]
        STT["Indic Speech-to-Text"]
    end

    subgraph PLATFORM["Core Platform Services"]
        Profile["Profile & Goal Service"]
        Plan["Plan Engine (Deterministic)"]
        Log["Meal & Metric Logging"]
        Nudge["Nudge & Notification"]
        Escalate["Dietitian Escalation"]
    end

    subgraph DATA["Data & Knowledge Layer"]
        KB[("Indian Food KB<br/>IFCT + RAG Index")]
        UserDB[("User & Plan Store")]
        LogDB[("Meal Logs &<br/>Body Metrics")]
    end

    subgraph EXT["External Integrations"]
        Wearable["Wearables (HealthKit)"]
        WABiz["WhatsApp Business API"]
        Barcode["FSSAI / Barcode DB"]
        Dietitian["Dietitian Network"]
    end

    Mobile --> GW
    WA --> GW
    Voice --> GW
    Web --> GW
    GW --> Orch
    
    Orch --> Diet & Track & Aware
    
    Diet --> LLM
    Track --> LLM
    Aware --> LLM
    
    Track --> Vision
    Voice -.-> STT
    
    Diet --> Profile & Plan
    Track --> Log & Plan & Nudge & Escalate
    Aware --> KB
    
    Plan --> KB & UserDB
    Profile --> UserDB
    Log --> LogDB
    
    Nudge -.-> WABiz
    Log -.-> Wearable
    Log -.-> Barcode
    Escalate -.-> Dietitian
```

### 3.2 Low-Level Design (LLD): Adaptive Replanning Engine

When a user logs a meal that deviates significantly from the plan, the Adaptive Replanning Engine dynamically offers corrective paths without inducing guilt.

```mermaid
sequenceDiagram
    participant User
    participant Orch as Orchestrator
    participant Track as Tracking Agent
    participant LLM as Reasoning LLM
    participant Plan as Plan Engine
    participant UI as UI/Notifications

    User->>Orch: Logs Meal (e.g., "2 Bhaturas & Chole")
    Orch->>Track: Route to Tracking Agent
    Track->>LLM: Parse Meal & Estimate Portions
    LLM-->>Track: Structured Dish & Kcal Data
    Track->>Plan: Compare actual intake vs planned targets
    Plan-->>Track: Returns Deviation % (Significant)
    
    Track->>Track: Analyze Deviation Strategy
    alt Strict Deadline Mode
        Track->>LLM: Generate tight calorie-correction for remaining days
    else Flexible Mode
        Track->>LLM: Extend deadline, sustain current daily kcal limits
    end
    
    LLM-->>Track: Generated Replanning Options
    Track-->>UI: Present "Strict Correction" vs "Sustainable Extension"
    User->>UI: Selects "Sustainable Extension"
    UI->>Track: Confirms choice
    Track->>Plan: Update active diet plan with new milestone
    Plan-->>Track: Success
    Track-->>Orch: Replanning Complete
```

### 3.3 Data Flow & State Management

A look at how user profile data transforms into actionable intelligence.

```mermaid
flowchart LR
    A[User Onboarding Inputs<br/>(Age, BMI, Cuisine)] --> P1(Profile & Target Calculator)
    P1 -->|Calculated Targets<br/>BMR/TDEE| P2(Diet Plan Generator)
    KB[(Food Knowledge Base)] --> P2
    P2 -->|Personalized Plan| P4(Plan vs Actual Comparator)
    
    C[Meal Image/Voice/Text] --> P3(Food Recognition & Parsing)
    P3 -->|Structured Log| P4
    
    P4 -->|Deviation Gap| P5(Adaptive Replanning Engine)
    P5 -->|Updated Plan| B[User Dashboard]
    
    C --> P6(Awareness & Insight Generator)
    KB --> P6
    P6 -->|Proactive Nudge| B
```

### 3.4 Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ GOAL : sets
    USER ||--o{ DIET_PLAN : owns
    USER ||--o{ MEAL_LOG : creates
    USER ||--o{ BODY_METRIC : tracks
    GOAL {
        float target_weight
        date deadline
        string mode
    }
    DIET_PLAN ||--|{ PLANNED_MEAL_SLOT : contains
    PLANNED_MEAL_SLOT }|--|| FOOD_ITEM : references
    MEAL_LOG }|--|| FOOD_ITEM : contains
    FOOD_ITEM {
        string region
        json nutrients
        json FSSAI_flags
    }
    MEAL_LOG ||--o{ NUDGE_EVENT : triggers
    NUDGE_EVENT }o--o| ESCALATION_CASE : may_raise
```

## 4. Key Demo Features 🚀

The provided application demo focuses on an MVP subset of the PoshanSarthi system to showcase the core AI capabilities and UI/UX:
- **Rich Interactive UI:** Modern glassmorphism, dynamic animations, and vibrant Indian-themed aesthetics using Vite, React, Framer Motion, and Tailwind CSS.
- **Diet Plan Visualization:** View an AI-generated daily diet plan adapted for Indian food preferences (Thali style).
- **Conversational Awareness:** An integrated AI Chatbot replicating the "Food Awareness Agent" to answer questions like "Is it safe to eat rice at night?"
- **Meal Logging Simulator:** Demo flow showing how a user can log an off-plan meal and receive adaptive replanning choices.

## 5. Technology Stack (Demo vs Prod)

| Layer | Production Vision | Minimal Demo (Provided) |
|---|---|---|
| **Frontend** | React Native, WhatsApp API, Web | React, Vite, Framer Motion, Vanilla CSS (Glassmorphism) |
| **Backend** | Microservices, Python/Go | Simulated API within React |
| **AI Models** | Gemini 3.1 Pro + Vision + Audio | Simulated AI Responses / Client-side Gemini Integration |
| **Database** | PostgreSQL + Pinecone (Vector) | Local State (Zustand/React Context) |

## 6. How to Run the Demo

1. Clone the repository: `git clone https://github.com/ritam03/poshan-sarthi.git`
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

---
*Built for the future of Indian Nutrition.* 🇮🇳
