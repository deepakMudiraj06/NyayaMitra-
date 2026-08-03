from app.services.document_registry import DocumentRegistry

registry = DocumentRegistry()

pdf = "legal_documents/motor_vehicle_act.pdf"

print("Should Process:", registry.should_process(pdf))

registry.update_document(pdf)

print(registry.load_registry())