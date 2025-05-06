from github import Github
import json
import os
import yaml

def load_config():
    """Cargar configuración desde el archivo YAML"""
    config_path = os.path.join('.github', 'doc-config.yml')
    with open(config_path, 'r') as f:
        return yaml.safe_load(f)

def fetch_github_data():
    # Cargar configuración
    config = load_config()
    
    # Inicializar cliente de GitHub
    g = Github(os.environ['WIKI_TOKEN'])
    
    # Obtener el repositorio actual
    repo = g.get_repo(os.environ['GITHUB_REPOSITORY'])
    
    # Obtener issues
    issues_data = []
    for issue in repo.get_issues(state='all'):
        if issue.pull_request is None:  # Solo issues, no PRs
            issues_data.append({
                'number': issue.number,
                'title': issue.title,
                'state': issue.state,
                'created_at': issue.created_at.isoformat(),
                'closed_at': issue.closed_at.isoformat() if issue.closed_at else None,
                'labels': [label.name for label in issue.labels],
                'milestone': issue.milestone.title if issue.milestone else None,
                'body': issue.body or '',
                'assignees': [assignee.login for assignee in issue.assignees]
            })
    
    # Obtener milestones
    milestones_data = []
    for milestone in repo.get_milestones(state='all'):
        milestone_data = {
            'title': milestone.title,
            'description': milestone.description or '',
            'state': milestone.state,
            'created_at': milestone.created_at.isoformat() if milestone.created_at else None,
            'due_on': milestone.due_on.isoformat() if milestone.due_on else None,
            'open_issues': milestone.open_issues,
            'closed_issues': milestone.closed_issues
        }
        milestones_data.append(milestone_data)
    
    # Obtener Pull Requests
    prs_data = []
    for pr in repo.get_pulls(state='all'):
        pr_data = {
            'number': pr.number,
            'title': pr.title,
            'state': pr.state,
            'created_at': pr.created_at.isoformat(),
            'merged_at': pr.merged_at.isoformat() if pr.merged_at else None,
            'closed_at': pr.closed_at.isoformat() if pr.closed_at else None,
            'body': pr.body or '',
            'labels': [label.name for label in pr.labels],
            'milestone': pr.milestone.title if pr.milestone else None,
            'assignees': [assignee.login for assignee in pr.assignees],
            'related_issues': [issue.number for issue in repo.get_issues(state='all') if f"#{pr.number}" in (issue.body or '')]
        }
        prs_data.append(pr_data)
    
    # Guardar datos
    os.makedirs('data', exist_ok=True)
    with open('data/issues.json', 'w') as f:
        json.dump(issues_data, f, indent=2)
    with open('data/milestones.json', 'w') as f:
        json.dump(milestones_data, f, indent=2)
    with open('data/pull_requests.json', 'w') as f:
        json.dump(prs_data, f, indent=2)

if __name__ == '__main__':
    fetch_github_data() 