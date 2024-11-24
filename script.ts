import { spawn } from 'child_process';

async function startDockerContainer(composePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dockerProcess = spawn('docker', ['compose', '-f', composePath, 'up', '-d']);

    dockerProcess.stdout.on('data', (data) => {
      console.log(`Docker Log: ${data}`);
    });

    dockerProcess.stderr.on('data', (data) => {
      console.log(`Docker Log: ${data}`);
    });

    dockerProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`Container ${composePath} started successfully.`);
        resolve();
      } else {
        reject(new Error(`Docker process exited with code ${code}`));
      }
    });
  });
}

async function endDockerContainer(composePath: string, removeVolumes: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      let dockerProcess;
      if (removeVolumes) {
        dockerProcess = spawn('docker', ['compose', '-f', composePath, 'down', '-v']);
      } else {
        dockerProcess = spawn('docker', ['compose', '-f', composePath, 'down']);
      }
      
  
      dockerProcess.stdout.on('data', (data) => {
        console.log(`Docker Log: ${data}`);
      });
  
      dockerProcess.stderr.on('data', (data) => {
        console.log(`Docker Log: ${data}`);
      });
  
      dockerProcess.on('close', (code) => {
        if (code === 0) {
          console.log(`Container ${composePath} stopped successfully.`);
          resolve();
        } else {
          reject(new Error(`Docker process exited with code ${code}`));
        }
      });
    });
  }

// Esempio di utilizzo
startDockerContainer('./docker_container/example2.yaml')
  .then(() => {endDockerContainer('./docker_container/example2.yaml', true)
                .then(() => console.log('Container terminato!'))
                .catch((err) => console.error('Errore:', err));})
  .catch((err) => console.error('Errore:', err));