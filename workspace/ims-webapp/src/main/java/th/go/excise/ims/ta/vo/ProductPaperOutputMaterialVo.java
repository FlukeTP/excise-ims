package th.go.excise.ims.ta.vo;

import org.springframework.web.multipart.MultipartFile;

public class ProductPaperOutputMaterialVo {

	private Long id;
	private String materialDesc;
	private String outputMaterialQty;
	private String dailyAccountQty;
	private String monthStatementQty;
	private String externalDataQty;
	private String maxDiffQty;

	private MultipartFile file;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getMaterialDesc() {
		return materialDesc;
	}

	public void setMaterialDesc(String materialDesc) {
		this.materialDesc = materialDesc;
	}

	public String getOutputMaterialQty() {
		return outputMaterialQty;
	}

	public void setOutputMaterialQty(String outputMaterialQty) {
		this.outputMaterialQty = outputMaterialQty;
	}

	public String getDailyAccountQty() {
		return dailyAccountQty;
	}

	public void setDailyAccountQty(String dailyAccountQty) {
		this.dailyAccountQty = dailyAccountQty;
	}

	public String getMonthStatementQty() {
		return monthStatementQty;
	}

	public void setMonthStatementQty(String monthStatementQty) {
		this.monthStatementQty = monthStatementQty;
	}

	public String getExternalDataQty() {
		return externalDataQty;
	}

	public void setExternalDataQty(String externalDataQty) {
		this.externalDataQty = externalDataQty;
	}

	public String getMaxDiffQty() {
		return maxDiffQty;
	}

	public void setMaxDiffQty(String maxDiffQty) {
		this.maxDiffQty = maxDiffQty;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}
	
	

}
