require "test_helper"

class VotedDestinationsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get voted_destinations_create_url
    assert_response :success
  end
end
