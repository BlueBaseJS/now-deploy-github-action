# now-deploy-github-action

This action is used to deploy BlueBase projects to Now.

This action uses GitHub API to set published build as a deployment.

| Branch  | Target     | GitHub Enviornment |
| ------- | ---------- | ------------------ |
| master  | production | web-production     |
| next    | staging    | web-next           |
| alpha   | null       | web-alpha          |
| beta    | null       | web-beta           |
| (other) | null       |                    |

## Outputs

### `url`

The url of the client bundle.

## Example usage

```yml
- name: Now Deploy
  uses: BlueBaseJS/now-deploy-github-action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    NOW_TOKEN: ${{ secrets.ZEIT_TOKEN }}
```
