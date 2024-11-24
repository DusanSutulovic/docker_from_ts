import { spawn } from 'child_process';

async function startDockerContainer(imageName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dockerProcess = spawn('docker', ['run', imageName]);

    dockerProcess.stdout.on('data', (data) => {
      console.log(`Docker Output: ${data}`);
    });

    dockerProcess.stderr.on('data', (data) => {
      console.error(`Docker Error: ${data}`);
    });

    dockerProcess.on('close', (code) => {
      if (code === 0) {
        console.log(`Container ${imageName} started successfully.`);
        resolve();
      } else {
        reject(new Error(`Docker process exited with code ${code}`));
      }
    });
  });
}

// Esempio di utilizzo
startDockerContainer('my-python-image')
  .then(() => console.log('Container avviato!'))
  .catch((err) => console.error('Errore:', err));