---
layout: page
permalink: /teaching/
title: teaching
description:

nav: true
nav_order: 3

_styles: |
  .guild-grid-container {
    position: relative;
    width: 100%;
    max-width: 1000px;
    margin: 1.5rem 0;
  }
  .guild-grid-container img {
    width: 100%;
    height: auto;
    display: block;
  }
  .guild-grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  .guild-cell {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .guild-half {
    flex: 1;
    position: relative;
  }
  .guild-half a {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: background-color 0.2s ease;
  }
  .guild-half a:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
---

### [The AI Guild @ FIU](https://ai-guild.notion.site/all-projects)

Since 2023, I've been teaching semi-weekly workshops on machine learning for students at FIU. We like to re-implement and learn from key research papers while building strong fundamentals in the field. A few of my favorite lectures have been on [multimodality](https://docs.google.com/presentation/d/1ipLbIHscrMT6qESFLlAH37ktCnxdRwOv7cNONQT50L4/preview?slide=id.p), [Variational Auto-Encoders](https://colab.research.google.com/drive/143vCFAJun_-rlJ08ysNbmMp2Wn1mw-jy?usp=sharing), and [Reinforcement Learning](https://colab.research.google.com/drive/1QJruRdXCN7dpyw1bqZQBJxwME_JA1ZzQ?usp=sharing).

_tip: click on the tiles to peek into some lectures!_

<div class="guild-grid-container">
  <img src="/assets/img/ai-guild.png" alt="AI Guild @ FIU Spring 2025 Workshop Series">
  <div class="guild-grid-overlay">
    <!-- Row 1, Cell 1 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Kick-off Meeting -->
        {% assign link_1a = "https://docs.google.com/presentation/d/1bRejOhrG15cK4k-CVeqivclrueZ6xIgOWVxqI6_H-JM/preview?slide=id.g32986fce135_2_0" %}
        {% if link_1a != "" %}<a href="{{ link_1a }}" title="Kick-off Meeting"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- CLIP: Contrastive Language-Image Pretraining -->
        {% assign link_1b = "" %}
        {% if link_1b != "" %}<a href="{{ link_1b }}" title="CLIP: Contrastive Language-Image Pretraining"></a>{% endif %}
      </div>
    </div>
    <!-- Row 1, Cell 2 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- ResNet50 + Early Fusion Mixture of Experts -->
        {% assign link_2a = "https://docs.google.com/presentation/d/1ipLbIHscrMT6qESFLlAH37ktCnxdRwOv7cNONQT50L4/preview?slide=id.p" %}
        {% if link_2a != "" %}<a href="{{ link_2a }}" title="ResNet50 + Early Fusion MoE"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Chameleon: Mixed-Modal Early-Fusion Foundation Models -->
        {% assign link_2b = "" %}
        {% if link_2b != "" %}<a href="{{ link_2b }}" title="Chameleon: Mixed-Modal Early-Fusion"></a>{% endif %}
      </div>
    </div>
    <!-- Row 1, Cell 3 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Intro to PyTorch -->
        {% assign link_3a = "https://docs.google.com/presentation/d/1v924nMVH63ZyNlUxrhKm3v-5kHN9850irJFnsEcgEPc/preview?slide=id.g333618df05f_0_0" %}
        {% if link_3a != "" %}<a href="{{ link_3a }}" title="Intro to PyTorch"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Gradient Descent -->
        {% assign link_3b = "https://colab.research.google.com/drive/1_p2M-6K8BUkIS_8xsFKyJbn08aMwhWNO?usp=sharing" %}
        {% if link_3b != "" %}<a href="{{ link_3b }}" title="Gradient Descent"></a>{% endif %}
      </div>
    </div>
    <!-- Row 1, Cell 4 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Deep Learning in JAX -->
        {% assign link_4a = "https://docs.google.com/presentation/d/1wuSY85qC37MzBJqh1yL918bY2ZgfD8EltQzI3jnHj4U/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_4a != "" %}<a href="{{ link_4a }}" title="Deep Learning in JAX"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Variational Auto-Encoders -->
        {% assign link_4b = "https://colab.research.google.com/drive/143vCFAJun_-rlJ08ysNbmMp2Wn1mw-jy?usp=sharing" %}
        {% if link_4b != "" %}<a href="{{ link_4b }}" title="Variational Auto-Encoders"></a>{% endif %}
      </div>
    </div>
    <!-- Row 2, Cell 1 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Transformers and Attention -->
        {% assign link_5a = "https://docs.google.com/presentation/d/1CRtBSZk81RyKp3LTMbAfvNq6Q5z0VpzhQc_PSceCDSg/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_5a != "" %}<a href="{{ link_5a }}" title="Transformers and Attention"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Attention is All You Need -->
        {% assign link_5b = "https://colab.research.google.com/github/ghubnerr/machine-learning/blob/main/GPT2_(%2BKV_Cache_%26_Kernel_Fusions).ipynb" %}
        {% if link_5b != "" %}<a href="{{ link_5b }}" title="Attention is All You Need"></a>{% endif %}
      </div>
    </div>
    <!-- Row 2, Cell 2 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Intro to HuggingFace and Ollama -->
        {% assign link_6a = "https://docs.google.com/presentation/d/17DsJC73xBC3YPc_Y5_eYRcpRwKT5_ZdA8xlOMsvCpf4/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_6a != "" %}<a href="{{ link_6a }}" title="Intro to HuggingFace and Ollama"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Reinforcement Learning Agents -->
        {% assign link_6b = "https://colab.research.google.com/drive/1QJruRdXCN7dpyw1bqZQBJxwME_JA1ZzQ?usp=sharing" %}
        {% if link_6b != "" %}<a href="{{ link_6b }}" title="Reinforcement Learning Agents"></a>{% endif %}
      </div>
    </div>
    <!-- Row 2, Cell 3 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Building LLM Agents -->
        {% assign link_7a = "https://docs.google.com/presentation/d/1LZKckIsDhhWRxnL9OUvL80oo_VrBAehFzr35hX761Iw/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_7a != "" %}<a href="{{ link_7a }}" title="Building LLM Agents"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Personalizing Your LLMs (RAG & Fine-Tuning) -->
        {% assign link_7b = "https://docs.google.com/presentation/d/1jkuYFoHymwMMWXEX5qwGAJzDAxlQqsEfvQuBy19mmVI/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_7b != "" %}<a href="{{ link_7b }}" title="Personalizing Your LLMs (RAG & Fine-Tuning)"></a>{% endif %}
      </div>
    </div>
    <!-- Row 2, Cell 4 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Captum AI: Model Interpretability -->
        {% assign link_8a = "https://docs.google.com/presentation/d/1suUAZhxIZoA7fiViOAm62GtZzX3D0RYwNN3tiupfCao/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_8a != "" %}<a href="{{ link_8a }}" title="Captum AI: Model Interpretability"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Towards Monosemanticity -->
        {% assign link_8b = "https://docs.google.com/presentation/d/10qPcn80urRcKGJiKq-HEIEErNJ4eZtrxXnurGJsXiPg/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_8b != "" %}<a href="{{ link_8b }}" title="Towards Monosemanticity"></a>{% endif %}
      </div>
    </div>
    <!-- Row 3, Cell 1 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Circuit Tracing and Attribution Graphs -->
        {% assign link_9a = "" %}
        {% if link_9a != "" %}<a href="{{ link_9a }}" title="Circuit Tracing and Attribution Graphs"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Scaling Monossemanticity -->
        {% assign link_9b = "" %}
        {% if link_9b != "" %}<a href="{{ link_9b }}" title="Scaling Monosemanticity"></a>{% endif %}
      </div>
    </div>
    <!-- Row 3, Cell 2 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- Reinforcement Learning in LLMs & TRL -->
        {% assign link_10a = "https://docs.google.com/presentation/d/181szR2CHLazUZby2K2hN6DcA-Bazay_PS94J5GHp-JU/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_10a != "" %}<a href="{{ link_10a }}" title="Reinforcement Learning in LLMs & TRL"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- STaR: Bootstrapping Reasoning With Reasoning -->
        {% assign link_10b = "" %}
        {% if link_10b != "" %}<a href="{{ link_10b }}" title="STaR: Bootstrapping Reasoning"></a>{% endif %}
      </div>
    </div>
    <!-- Row 3, Cell 3 -->
    <div class="guild-cell">
      <div class="guild-half">
        <!-- DeepSeek-R1 -->
        {% assign link_11a = "https://docs.google.com/presentation/d/1lyofJ0qmzjrTW7tp1SzvLJNQnZt5DNTPRpZkpZG_M4I/preview?slide=id.g2d940d7604d_0_0" %}
        {% if link_11a != "" %}<a href="{{ link_11a }}" title="DeepSeek-R1"></a>{% endif %}
      </div>
      <div class="guild-half">
        <!-- Wrap-up Meeting -->
        {% assign link_11b = "" %}
        {% if link_11b != "" %}<a href="{{ link_11b }}" title="Wrap-up Meeting"></a>{% endif %}
      </div>
    </div>
    <!-- Row 3, Cell 4: Title card - not clickable -->
    <div class="guild-cell"></div>
  </div>
</div>

---

### Courses

- COP 3337 - _Programming II, Teaching Assistant, Spring 2024_
- MAC 2310 - _Calculus I, Learning Assistant, Fall 2023_ [x2]
- MAC 1147 - _Pre-Calculus Algebra and Trigonometry, Learning Assistant, Spring 2023_
