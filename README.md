# MVP
Monorepo dell'MVP del progetto di SWE del gruppo <span style="color:#f16610">**Tech Minds**</span>. \
La documentazione del progetto è in [techminds-unipd.github.io/docs](https://techminds-unipd.github.io/docs).

Il progetto si compone di tre parti:
- `/frontend`: React+Vite
- `/backend`: NestJS
- `/worker`: Python + Flask

È possibile avviare tutta l'infrastruttura col comando
```
docker compose up [--watch] [-d]
```
- `--watch`: hot reload delle parti cambiate. Ricostruisce l'immagine se vengono cambiati `package.json`, `package-lock.json` o `requirements.txt` in una delle cartelle.
- `-d`: detatched, l'infrastruttura viene avviata in background e non si vedono eventuali errori