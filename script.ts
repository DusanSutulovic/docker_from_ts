import { spawn } from 'child_process';

export interface ILogger {
    info(loggedInfo: string): void;
}

export class DockerContainerHandler {
    constructor(private composePath: string, private logger?: ILogger) {}
    
    private handleDockerProcess(optionsAdd: string[]): Promise<void> {
        return new Promise((resolve, reject) => {
        const options: string[] = ['compose', '-f'].concat(optionsAdd);
        const dockerProcess = spawn('docker', options);
        dockerProcess.stdout.on('data', (data) => {
            this.logger?.info(`Docker Log: ${data}`);
            });
    
        dockerProcess.stderr.on('data', (data) => {
            this.logger?.info(`Docker Log: ${data}`);
            });

        dockerProcess.on('close', (code) => {
            if (code === 0) {
                this.logger?.info(`Container ${this.composePath} started successfully.`);
                resolve();
            } else {
                reject(new Error(`Docker process exited with code ${code}`));
            }
            });

        });
    }

    startDockerContainer() {
        return this.handleDockerProcess([this.composePath, 'up', '-d']);
    }
    
    endDockerContainer(removeVolumes: boolean) {
            let options: string[] = [this.composePath, 'down'];

            if (removeVolumes) {
                options.push('-v');
            }

            return this.handleDockerProcess(options);
        }

}



/* Esempio di utilizzo
startDockerContainer('./docker_container/example2.yaml')
  .then(() => {endDockerContainer('./docker_container/example2.yaml', true)
                .then(() => console.log('Container terminato!'))
                .catch((err) => console.error('Errore:', err));})
  .catch((err) => console.error('Errore:', err));

  */