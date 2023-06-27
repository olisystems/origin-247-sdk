import subprocess

# Execute the TypeScript file using ts-node
result_claim = subprocess.run(['ts-node', '../origin-247-claim/tests/computation.ts'], capture_output=True, text=True)
result_transfer = subprocess.run(['ts-node', '../origin-247-transfer/test/computation.ts'], capture_output=True, text=True)

# Print the output
print(result_claim.stdout)
print(result_transfer.stdout)
