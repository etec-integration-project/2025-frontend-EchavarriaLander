import json
from datetime import datetime
from jinja2 import Template
import os
import yaml

def load_config():
    """Cargar configuración desde el archivo YAML"""
    config_path = os.path.join('.github', 'doc-config.yml')
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)

def generate_release_notes():
    config = load_config()
    
    # Cargar datos
    with open('data/pull_requests.json', 'r') as f:
        prs = json.load(f)
    with open('data/issues.json', 'r') as f:
        issues = json.load(f)
    with open('data/milestones.json', 'r') as f:
        milestones = json.load(f)
    
    # Filtrar PRs fusionados
    merged_prs = [pr for pr in prs if pr['merged_at'] is not None]
    
    # Generar notas de lanzamiento
    template_str = """# Notas de Lanzamiento

_Última actualización: {{ current_date }}_

## Cambios Recientes

{% for pr in merged_prs %}
### #{{ pr.number }}: {{ pr.title }}
**Estado:** {{ pr.state }}
**Fusionado:** {{ pr.merged_at }}
{% if pr.milestone %}**Milestone:** {{ pr.milestone }}{% endif %}
{% if pr.labels %}**Labels:** {{ pr.labels|join(', ') }}{% endif %}

{{ pr.body }}

{% if pr.related_issues %}
#### Issues Relacionados:
{% for issue_num in pr.related_issues %}
- #{{ issue_num }}
{% endfor %}
{% endif %}

---
{% endfor %}

## Milestones Completados

{% for milestone in milestones if milestone.state == 'closed' %}
### {{ milestone.title }}
**Estado:** {{ milestone.state }}
**Descripción:** {{ milestone.description }}
**Issues Cerrados:** {{ milestone.closed_issues }}
**Issues Abiertos:** {{ milestone.open_issues }}

---
{% endfor %}
"""
    
    template = Template(template_str)
    notes_content = template.render(
        current_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        merged_prs=merged_prs,
        milestones=milestones
    )
    
    # Guardar notas de lanzamiento
    with open('docs/RELEASE_NOTES.md', 'w') as f:
        f.write(notes_content)
    
    # Generar documentación de PRs
    prs_template_str = """# Pull Requests

_Última actualización: {{ current_date }}_

## Pull Requests Abiertos

{% for pr in prs if pr.state == 'open' %}
### #{{ pr.number }}: {{ pr.title }}
**Estado:** {{ pr.state }}
**Creado:** {{ pr.created_at }}
{% if pr.milestone %}**Milestone:** {{ pr.milestone }}{% endif %}
{% if pr.labels %}**Labels:** {{ pr.labels|join(', ') }}{% endif %}

{{ pr.body }}

---
{% endfor %}

## Pull Requests Cerrados

{% for pr in prs if pr.state == 'closed' and not pr.merged_at %}
### #{{ pr.number }}: {{ pr.title }}
**Estado:** {{ pr.state }}
**Creado:** {{ pr.created_at }}
**Cerrado:** {{ pr.closed_at }}
{% if pr.milestone %}**Milestone:** {{ pr.milestone }}{% endif %}
{% if pr.labels %}**Labels:** {{ pr.labels|join(', ') }}{% endif %}

{{ pr.body }}

---
{% endfor %}

## Pull Requests Fusionados

{% for pr in prs if pr.merged_at %}
### #{{ pr.number }}: {{ pr.title }}
**Estado:** {{ pr.state }}
**Creado:** {{ pr.created_at }}
**Fusionado:** {{ pr.merged_at }}
{% if pr.milestone %}**Milestone:** {{ pr.milestone }}{% endif %}
{% if pr.labels %}**Labels:** {{ pr.labels|join(', ') }}{% endif %}

{{ pr.body }}

{% if pr.related_issues %}
#### Issues Relacionados:
{% for issue_num in pr.related_issues %}
- #{{ issue_num }}
{% endfor %}
{% endif %}

---
{% endfor %}
"""
    
    template = Template(prs_template_str)
    prs_content = template.render(
        current_date=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        prs=prs
    )
    
    # Guardar documentación de PRs
    with open('docs/pull-requests.md', 'w') as f:
        f.write(prs_content)

if __name__ == '__main__':
    generate_release_notes() 