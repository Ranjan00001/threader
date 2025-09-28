from utils import STATUS_SUCCESS, STATUS_ERROR, DEFAULT_PAGE_SIZE, config

def test_constants():
    assert STATUS_SUCCESS == "success"
    assert STATUS_ERROR == "error"
    assert isinstance(DEFAULT_PAGE_SIZE, int)

def test_config_defaults():
    assert config.API_KEY == "dummy-key"
    assert config.DEBUG is True or config.DEBUG is False
