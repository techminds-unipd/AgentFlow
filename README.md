# MVP
Monorepo dell'MVP del progetto di SWE del gruppo <span style="color:#f16610">**Tech Minds**</span>. \
La documentazione del progetto è in [techminds-unipd.github.io/docs](https://techminds-unipd.github.io/docs).

Il progetto si compone di tre parti:
- `/frontend`: React + Vite
- `/backend`: NestJS
- `/agente`: Python + Flask

È possibile avviare tutta l'infrastruttura col comando
```
docker compose up [--watch] [-d]
```
- `-d`: detatched, l'infrastruttura viene avviata in background e non si vedono eventuali errori.

Per costruire le immagini usare `docker compose build`
