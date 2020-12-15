class MonthsController < ApplicationController
  before_action :set_month, only: [:show, :edit, :update, :destroy]

  # GET /months
  # GET /months.json
  def index
    @months = Month.all
  end

  # GET /months/1
  # GET /months/1.json
  def show
  end

  # GET /months/new
  def new
    @month = Month.new
  end

  # GET /months/1/edit
  def edit
  end

  # POST /months
  # POST /months.json
  def create
  end

  # PATCH/PUT /months/1
  # PATCH/PUT /months/1.json
  def update
    if @month.update(month_params)
      render json: { status: 'SUCCESS', message: 'Updated the month', data: @month }
    else
      render json: { status: 'SUCCESS', message: 'Not updated', data: @month.errors }
    end
  end

  # DELETE /months/1
  # DELETE /months/1.json
  def destroy
    @month.destroy
    respond_to do |format|
      format.html { redirect_to months_url, notice: 'Month was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_month
      @month = Month.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def month_params
      params.require(:month).permit(:date)
    end
end
