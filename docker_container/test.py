import platform

os_name = platform.system()
architecture = platform.architecture()
print(f"Hello Wordl! from {os_name} operating system on {architecture[0]} {architecture[1]} architecture")