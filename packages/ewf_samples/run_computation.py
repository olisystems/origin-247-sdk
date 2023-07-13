import subprocess

# Execute the TypeScript file using ts-node
result = subprocess.run(['ts-node', '../origin-247-claim/tests/computation.ts'], capture_output=True, text=True)

# Print the output
print(result.stdout)
