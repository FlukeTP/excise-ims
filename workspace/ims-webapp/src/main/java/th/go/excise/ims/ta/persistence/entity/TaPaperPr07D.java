package th.go.excise.ims.ta.persistence.entity;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import th.co.baiwa.buckwaframework.common.persistence.entity.BaseEntity;

@Entity
@Table(name = "TA_PAPER_PR07_D")
public class TaPaperPr07D extends BaseEntity {

	private static final long serialVersionUID = 4746718030382678427L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TA_PAPER_PR07_D_GEN")
	@SequenceGenerator(name = "TA_PAPER_PR07_D_GEN", sequenceName = "TA_PAPER_PR07_D_SEQ", allocationSize = 1)
	@Column(name = "PAPER_PR07_D_SEQ")
	private Long paperPr07DSeq;
	@Column(name = "PAPER_PR_NUMBER")
	private String paperPrNumber;
	@Column(name = "SEQ_NO")
	private Integer seqNo;
	@Column(name = "MATERIAL_DESC")
	private String materialDesc;
	@Column(name = "TAX_REDUCE_AMT")
	private BigDecimal taxReduceAmt;
	@Column(name = "TAX_REDUCE_QTY")
	private BigDecimal taxReduceQty;
	@Column(name = "TAX_REDUCE_PER_UNIT_AMT")
	private BigDecimal taxReducePerUnitAmt;
	@Column(name = "BILL_NO")
	private BigDecimal billNo;
	@Column(name = "BILL_TAX_AMT")
	private BigDecimal billTaxAmt;
	@Column(name = "BILL_TAX_QTY")
	private BigDecimal billTaxQty;
	@Column(name = "BILL_TAX_PER_UNIT")
	private BigDecimal billTaxPerUnit;
	@Column(name = "DIFF_TAX_REDUCE_AMT")
	private BigDecimal diffTaxReduceAmt;

	public Long getPaperPr07DSeq() {
		return paperPr07DSeq;
	}

	public void setPaperPr07DSeq(Long paperPr07DSeq) {
		this.paperPr07DSeq = paperPr07DSeq;
	}

	public String getPaperPrNumber() {
		return paperPrNumber;
	}

	public void setPaperPrNumber(String paperPrNumber) {
		this.paperPrNumber = paperPrNumber;
	}

	public Integer getSeqNo() {
		return seqNo;
	}

	public void setSeqNo(Integer seqNo) {
		this.seqNo = seqNo;
	}

	public String getMaterialDesc() {
		return materialDesc;
	}

	public void setMaterialDesc(String materialDesc) {
		this.materialDesc = materialDesc;
	}

	public BigDecimal getTaxReduceAmt() {
		return taxReduceAmt;
	}

	public void setTaxReduceAmt(BigDecimal taxReduceAmt) {
		this.taxReduceAmt = taxReduceAmt;
	}

	public BigDecimal getTaxReduceQty() {
		return taxReduceQty;
	}

	public void setTaxReduceQty(BigDecimal taxReduceQty) {
		this.taxReduceQty = taxReduceQty;
	}

	public BigDecimal getTaxReducePerUnitAmt() {
		return taxReducePerUnitAmt;
	}

	public void setTaxReducePerUnitAmt(BigDecimal taxReducePerUnitAmt) {
		this.taxReducePerUnitAmt = taxReducePerUnitAmt;
	}

	public BigDecimal getBillNo() {
		return billNo;
	}

	public void setBillNo(BigDecimal billNo) {
		this.billNo = billNo;
	}

	public BigDecimal getBillTaxAmt() {
		return billTaxAmt;
	}

	public void setBillTaxAmt(BigDecimal billTaxAmt) {
		this.billTaxAmt = billTaxAmt;
	}

	public BigDecimal getBillTaxQty() {
		return billTaxQty;
	}

	public void setBillTaxQty(BigDecimal billTaxQty) {
		this.billTaxQty = billTaxQty;
	}

	public BigDecimal getBillTaxPerUnit() {
		return billTaxPerUnit;
	}

	public void setBillTaxPerUnit(BigDecimal billTaxPerUnit) {
		this.billTaxPerUnit = billTaxPerUnit;
	}

	public BigDecimal getDiffTaxReduceAmt() {
		return diffTaxReduceAmt;
	}

	public void setDiffTaxReduceAmt(BigDecimal diffTaxReduceAmt) {
		this.diffTaxReduceAmt = diffTaxReduceAmt;
	}

}
