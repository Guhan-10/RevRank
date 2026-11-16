from app import allowed_origins


def test_health_ok(client):
    res = client.get("/health")
    assert res.status_code == 200
    assert res.get_json() == {"status": "ok", "database": "ok"}


def test_health_reports_unreachable_database(client, monkeypatch):
    import data_base

    def fail(*args, **kwargs):
        raise ConnectionError("no db")

    monkeypatch.setattr(data_base.client.admin, "command", fail)
    res = client.get("/health")
    assert res.status_code == 503
    assert res.get_json()["database"] == "unreachable"


def test_cors_allows_configured_origin(client):
    origin = allowed_origins[0]
    res = client.get("/cars", headers={"Origin": origin})
    assert res.headers.get("Access-Control-Allow-Origin") == origin


def test_cors_blocks_other_origins(client):
    res = client.get("/cars", headers={"Origin": "https://evil.example.com"})
    assert "Access-Control-Allow-Origin" not in res.headers
