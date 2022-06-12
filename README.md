# File-manager

Run FileManager with command 'npm run start -- --userName={Name}'

## Basic Operations

    - **up** Go upper from current directory
    - **cd ..** Go upper from current directory
    - **cd {somePath}** Go to dedicated folder from current directory
    - **ls** List all files and folders in current directory
    - **cat {path}** Read file and print it's content in console
    - **add {somefileName}** Create empty file
    - **rename {filepath} {newFileName}** Rename file
    - **cp {pathToCopyFile} {pathForCopuFile}** Copy file
    - **mv {pathForMove} {pathToMove}** Move file
    - **mv {filePath}** Delete file

    - **os --EOL** Get EOL (default system End-Of-Line)
    - **os --cpus** Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)
    - **os --homedir** Get home directory
    - **os --username** Get current *system user name* (Do not confuse with the username that is set when the application starts)
    - **os --architecture** Get CPU architecture for which Node.js binary has compiled


    - **hash {pathForFile}** Calculate hash for file 
    - **compress{pathForFile} {PathForCompressedFile}** Compress file (using Brotli algorithm)
    - **decompress{pathForCompressFile} {PathForDeCompressedFile}** Decompress file (using Brotli algorithm)
